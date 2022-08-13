import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';
import { USER_NOT_FOUND, WRONG_PASSWORD } from './auth.constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';

export type JWTPayload = Pick<UserModel, 'email'>;

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findUser(email);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD);
		}

		return user.email;
	}

	async login(email: string) {
		const payload: JWTPayload = { email };
		return { access_token: await this.jwtService.signAsync(payload) };
	}
}

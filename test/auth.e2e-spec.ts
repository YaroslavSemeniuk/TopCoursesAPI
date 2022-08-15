import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
	login: 'yar@email.com',
	password: 'qwerty',
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let access_token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				access_token = body.access_token;
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: 'wrong password' })
			.expect(401, {
				statusCode: 401,
				message: WRONG_PASSWORD,
				error: 'Unauthorized',
			});
	});

	it('/auth/login (POST) - fail login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'wrong login' })
			.expect(401, {
				statusCode: 401,
				message: USER_NOT_FOUND,
				error: 'Unauthorized',
			});
	});

	afterAll(() => disconnect());
});

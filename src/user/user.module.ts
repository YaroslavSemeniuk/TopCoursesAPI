import { Module } from '@nestjs/common';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	providers: [UserService],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
	],
	exports: [UserService],
})
export class UserModule {}

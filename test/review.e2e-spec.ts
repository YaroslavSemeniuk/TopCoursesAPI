import * as request from 'supertest';
import { Types, disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
	login: 'yar@email.com',
	password: 'qwerty',
};

const testDto: CreateReviewDto = {
	name: 'test',
	title: 'title',
	description: 'description',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let access_token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto);
		access_token = body.access_token;
	});

	it('/review/create (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/review/create (POST) - fail (error body)', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0, name: 4 })
			.expect(400);
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${productId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.set('Authorization', `Bearer ${access_token}`)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.set('Authorization', `Bearer ${access_token}`)
			.expect(404, { statusCode: 404, message: REVIEW_NOT_FOUND });
	});

	afterAll(() => disconnect());
});

import { Types } from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { ReviewService } from './review.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ReviewService', () => {
	let service: ReviewService;

	//	jest.fn() - функция которая позволяет мокать, слушать ту или иную функцию
	const exec = { exec: jest.fn() };
	const reviewRepositoryFactory = () => ({
		find: () => exec,
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,
				// говорим найти нам в зависимостях ReviewModel, найти ее токен и по нему заинжектить, некоторую новую фабрику
				{
					useFactory: reviewRepositoryFactory,
					provide: getModelToken('ReviewModel'),
				},
			],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('findByProductId - success', async () => {
		const id = new Types.ObjectId().toHexString();

		reviewRepositoryFactory()
			.find()
			.exec.mockReturnValueOnce([{ productId: id }]);

		const res = await service.findByProductId(id);
		expect(res[0].productId).toBe(id);
	});
});

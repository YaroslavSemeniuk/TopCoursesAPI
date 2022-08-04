import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel)
		private readonly reviewModel: ModelType<ReviewModel>,
	) {} // подключили модель из базы в качестве provider-а и получили доступ к методам (CRUD) из ODM

	async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel
			.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
	}

	async findByProductId(productId: string,
	): Promise<DocumentType<ReviewModel>[]> {
		return this.reviewModel
			.find({ productId: new Types.ObjectId(productId) }).exec();
	}
}

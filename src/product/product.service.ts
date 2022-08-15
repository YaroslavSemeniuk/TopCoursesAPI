import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { ReviewModel } from '../review/review.model';
import { FindProductDto } from './dto/find-product.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel)
		private readonly productModel: ModelType<ProductModel>,
	) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findWithReviews(dto: FindProductDto) {
		return (await this.productModel
			.aggregate([
				{ $match: { categories: dto.category } },
				{ $sort: { _id: 1 } },
				{ $limit: dto.limit },
				{
					$lookup: {
						from: 'Review',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
						// Overwrite the "reviews" field, according to the logic of the function we created.
						// Namely, changing the standard sorting from oldest to newest, in reverse order.
						// The functionality of creating your own functions is available since Mongo 4.4
						reviews: {
							$function: {
								body: `function (reviews) {
									reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
									return reviews;
								}`,
								args: ['$reviews'],
								lang: 'js'
							}
						}
					},
				},
			])
			.exec()) as (ProductModel & {
			reviews: ReviewModel[];
			reviewCount: number;
			reviewAvg: number;
		})[];
	}
}

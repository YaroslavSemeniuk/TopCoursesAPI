import {
	Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		// вот тут обрабатываем кейс, когда может вернуться или значение или его отсутствие (null)
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		// если в if не попали, то просто прошли дальше - то есть, просто вернули 200-й код с пустым body
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}
}

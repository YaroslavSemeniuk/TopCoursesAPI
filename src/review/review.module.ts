import { Module } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewController } from './review.controller';

@Module({
	controllers: [ReviewController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ReviewModel,
				schemaOptions: {
					collection: 'Review',
				},
			},
		]),
	],
	providers: [ReviewService],
})
export class ReviewModule {}

import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	ValidateNested,
} from 'class-validator';
import {
	JinniData,
	TopLevelCategory,
	TopPageAdvantage,
} from '../top-page.model';
import { Type } from 'class-transformer';

export class TopPageAdvantageDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class JinniDataDto {
	@IsNumber()
	@IsPositive()
	count: number;

	@IsNumber()
	@IsPositive()
	juniorSalary: number;

	@IsNumber()
	@IsPositive()
	middleSalary: number;

	@IsNumber()
	@IsPositive()
	seniorSalary: number;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@Type(() => JinniDataDto)
	jinni?: JinniData;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantageDto)
	advantages: TopPageAdvantage[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}

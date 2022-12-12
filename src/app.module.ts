import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './config/mongo.config';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';

@Module({
  imports: [
	AuthModule,
	TopPageModule,
	ProductModule,
	ReviewModule,
  	UserModule,
  	FilesModule,
  	SitemapModule,
	ConfigModule.forRoot(), // module for working with env files
	TypegooseModule.forRootAsync({
		imports: [ConfigModule], // import the module that contains the required service (provider)
		inject: [ConfigService], // inject the dependency into factory from the imported module (line above)
		useFactory: getMongoConfig  // setup what will the factory look like
	}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

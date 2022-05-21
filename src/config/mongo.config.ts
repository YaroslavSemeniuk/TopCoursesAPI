import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return { uri: getMongoURI(configService), ...getMongoOptions() };
 };

const getMongoURI = (configService: ConfigService) =>
  `mongodb://${configService.get('MONGO_LOGIN')}:${configService.get('MONGO_PASSWORD')}`
  + `@${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}`
  + `/${configService.get('MONGO_AUTH_DATABASE')}`;

/*
  Not necessary. We just add features that are most commonly used and may come in handy
  More options in doc: https://typegoose.github.io/typegoose/docs/api/index-api/
*/
const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true
})

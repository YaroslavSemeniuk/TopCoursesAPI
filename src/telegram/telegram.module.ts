import { TelegramService } from './telegram.service';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { ITelegramModulesAsyncOptions } from './telegram.interfaces';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

// The forRoot method means that the module must be imported at the root of the application and
// propagated throughout the entire application.
// Therefore, in order for this to not need to be injected in other modules, we will make it global.
// After that, it will be enough to inject it once and then use it everywhere
@Global()
@Module({})
export class TelegramModule {
	static forRootAsync(options: ITelegramModulesAsyncOptions): DynamicModule {
		const asyncOptions = TelegramModule.createAsyncOptionsProvider(options);

		return {
			module: TelegramModule,
			imports: options.imports,
			providers: [TelegramService, asyncOptions],
			exports: [TelegramService],
		};
	}

	// create as a provider so that in the future we can get this provider anywhere
	private static createAsyncOptionsProvider(options: ITelegramModulesAsyncOptions): Provider {
		// importing this provider into the service by its name,
		// it will be possible to use variables from the result of the useFactory execution
		return {
			provide: TELEGRAM_MODULE_OPTIONS, // name by which we will get the provider
			useFactory: async (...args: any[]) => {
				// will execute the factory that was passed as a parameter to TelegramModule.forRootAsync({useFactory})
				const config = await options.useFactory(...args);
				return config;
			},
			// add the ability to implement other modules that will be necessary for the execution of options.useFactory
			inject: options.inject || [],
		};
	}
}

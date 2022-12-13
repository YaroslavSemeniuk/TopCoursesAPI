import { Telegraf } from 'telegraf';
import { Inject, Injectable } from '@nestjs/common';
import { ITelegramOptions } from './telegram.interfaces';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: ITelegramOptions;

	// TelegramModule has already been injected into the dependency tree (in AppModule) and is open for use (@Global() in TelegramModule)
	// Now we need to drag from TelegramModule TelegramOptions into the service.
	// Specify the name of a specific provider to implement - @Inject(TELEGRAM_MODULE_OPTIONS)
	// actually executed the createAsyncOptionsProvider function and put the result of execution in the options variable
	constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
		this.bot = new Telegraf(options.token);
		this.options = options;
	}

	async sendMessage(message: string, chatId: string = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message);
	}
}

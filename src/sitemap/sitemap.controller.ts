import { Builder } from 'xml2js';
import { format, subDays } from 'date-fns';
import { ConfigService } from '@nestjs/config';
import { CATEGORY_URL } from './sitemap.constants';
import { Controller, Get, Header } from '@nestjs/common';
import { TopPageService } from '../top-page/top-page.service';

@Controller('sitemap')
export class SitemapController {
	domain: string;

	constructor(
		private readonly topPageService: TopPageService,
		private readonly configService: ConfigService,
	) {
		this.domain = this.configService.get('DOMAIN') ?? '';
	}

	@Get('xml')
	@Header('content-type', 'text/xml')
	async sitemap() {
		const formatDate = 'yyyy-MM-dd\'T\'HH:mm:00.000xxx';

		let res = [
			{
				loc: this.domain,
				lastmod: format(subDays(new Date(), 1), formatDate),
				changefreq: 'daily',
				priority: '1.0',
			},
			{
				loc: `${this.domain}/courses`,
				lastmod: format(subDays(new Date(), 1), formatDate),
				changefreq: 'daily',
				priority: '1.0',
			},
		];

		const pages = await this.topPageService.findAll();
		res = res.concat(
			pages.map((page) => {
				return {
					loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${
						page.alias
					}`,
					lastmod: format(new Date(page.updatedAt ?? new Date()), formatDate),
					changefreq: 'weekly',
					priority: '0.7',
				};
			}),
		);

		const xmlBuilder = new Builder({
			xmldec: { version: '1.0', encoding: 'UTF-8' },
		});
		return xmlBuilder.buildObject({
			urlset: {
				$: {
					xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
				},
				url: res,
			},
		});
	}
}

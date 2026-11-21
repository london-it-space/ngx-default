import { Routes } from '@angular/router';
import { buildRouteMeta } from '@wawjs/ngx-default';
import { companyProfile } from './feature/company/company.data';

const notFoundRoute = {
	data: {
		meta: {
			title: 'Page not found',
			robots: 'noindex, nofollow',
		},
	},
	loadComponent: () =>
		import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
};

export const routes: Routes = [
	{
		path: '',
		data: {
			meta: {
				...buildRouteMeta(companyProfile, '/'),
				// The home title is the full company title (it already names the brand, and an org
				// title is the brand alone), so it gets no " | name" suffix and nothing is stripped.
				title: companyProfile.defaultSeo.title,
				titleSuffix: '',
			},
		},
		loadComponent: () =>
			import('./pages/landing/landing.component').then((m) => m.LandingComponent),
	},
	// Prerendered to 404/index.html; the deploy workflow publishes it as 404.html for GitHub Pages.
	{ path: '404', ...notFoundRoute },
	// Unknown URLs reached inside the app (for example a broken link) show the same page.
	{ path: '**', ...notFoundRoute },
];

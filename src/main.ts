import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';

// platformBrowserDynamic().bootstrapModule(AppComponent)
//   .catch(err => console.error(err));

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'https://mayadevbe.me/privacypolicy/', //TODO change domain
  },
  palette: {
    popup: {
      background: '#1d2021',
      text: '#ebdbb2',
      link: '#689d6a',
    },
    button: {
      background: '#8ec07c',
      text: '#1d2021',
      border: 'transparent',
    },
  },
  theme: 'classic',
  type: 'info',
  content: {
    message:
      'This website uses cookies to ensure you get the best experience on our website.',
    dismiss: 'Got it!',
    deny: 'Refuse cookies',
    link: 'Learn more',
    href: 'https://mayadevbe.me/privacypolicy/',
    policy: 'Cookie Policy',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: NgcCookieConsentModule.forRoot, useValue: cookieConfig }
  ],
};

bootstrapApplication(AppComponent, appConfig).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });

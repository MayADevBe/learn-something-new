import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { SelectTimeComponent } from './select-time/select-time.component';
import { SelectMoneyComponent } from './select-money/select-money.component';
import { StatsComponent } from './stats/stats.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig,
} from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost', //TODO change domain
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

@NgModule({
  declarations: [
    AppComponent,
    SelectCategoryComponent,
    SelectTimeComponent,
    SelectMoneyComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    DragScrollModule,
    BrowserAnimationsModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

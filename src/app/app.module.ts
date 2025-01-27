// import { ApplicationConfig, Component, NgModule } from '@angular/core';
// import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

// import { AppComponent } from './app.component';
// import { SelectCategoryComponent } from './select-category/select-category.component';
// import { SelectTimeComponent } from './select-time/select-time.component';
// import { SelectMoneyComponent } from './select-money/select-money.component';
// import { StatsComponent } from './stats/stats.component';
// import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {
//   NgcCookieConsentModule,
//   NgcCookieConsentConfig,
// } from 'ngx-cookieconsent';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// const cookieConfig: NgcCookieConsentConfig = {
//   cookie: {
//     domain: 'https://mayadevbe.me/privacypolicy/', //TODO change domain
//   },
//   palette: {
//     popup: {
//       background: '#1d2021',
//       text: '#ebdbb2',
//       link: '#689d6a',
//     },
//     button: {
//       background: '#8ec07c',
//       text: '#1d2021',
//       border: 'transparent',
//     },
//   },
//   theme: 'classic',
//   type: 'info',
//   content: {
//     message:
//       'This website uses cookies to ensure you get the best experience on our website.',
//     dismiss: 'Got it!',
//     deny: 'Refuse cookies',
//     link: 'Learn more',
//     href: 'https://mayadevbe.me/privacypolicy/',
//     policy: 'Cookie Policy',
//   },
// };

// // @Component({
// //   selector: "app-root",
// //   imports: [BrowserModule,
// //     NgxChartsModule,
// //     // DragScrollComponent,
// //     // DragScrollItemDirective,
// //     BrowserAnimationsModule,
// //     // AppComponent,
// //     // SelectCategoryComponent,
// //     // SelectTimeComponent,
// //     // SelectMoneyComponent,
// //     StatsComponent],
// //   //providers: [NgcCookieConsentModule.forRoot(cookieConfig),],
// //   templateUrl: './app.component.html',
// //   styleUrls: ['./app.component.css'],
// // })

// // @NgModule({
// //   declarations: [
    
// //   ],
// //   exports: [
// //     AppComponent,
// //     SelectCategoryComponent,
// //     SelectTimeComponent,
// //     SelectMoneyComponent,
// //     StatsComponent,
// //   ],
// //   imports: [
// //     BrowserModule,
// //     NgxChartsModule,
// //     DragScrollComponent,
// //     DragScrollItemDirective,
// //     BrowserAnimationsModule,
// //     NgcCookieConsentModule.forRoot(cookieConfig),
// //     AppComponent,
// //     SelectCategoryComponent,
// //     SelectTimeComponent,
// //     SelectMoneyComponent,
// //     StatsComponent,
// //   ],
// //   providers: [],
// //   bootstrap: [],
// // })
// export class AppModule {}

// export const appConfig: ApplicationConfig = {
//   providers: [
//     {provide: NgcCookieConsentModule.forRoot, useValue: cookieConfig }
//   ],
// };

// //platformBrowserDynamic([{provide: NgcCookieConsentModule.forRoot, useValue: cookieConfig }]).bootstrapModule(AppModule); 
// bootstrapApplication(AppComponent, appConfig).catch((error) => {
//   // eslint-disable-next-line no-console
//   console.error(error);
// });
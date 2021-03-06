import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SchedulePage } from '../pages/schedule/schedule';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';
import { SideMenu } from "../pages/sideMenu/sideMenu";
import { SettingPage } from "../pages/setting/setting";
import { RouteService } from "../services/routeService";
import { GoogleService } from "../services/googleService";
import { HttpService } from "../services/httpService";
import { NotifyService } from "../services/notifyService";
import { Storage } from '@ionic/storage';
import { XHRBackend, RequestOptions, HttpModule } from "@angular/http";
import { LoginPage } from '../pages/login/login';
import { DateTimeService } from '../services/datetimeService';
import { RoutePage } from '../pages/routes/route';
import { SchedulePage2 } from '../pages/schedule/schedule2';
import { ViewRoutePage } from '../pages/routes/viewRoute';
import { RouteSearchResultPage } from '../pages/routes/routeSearchResult';
import { EditSchedulePage } from '../pages/schedule/editSchedule';
import { Push } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SubscriberPage } from '../pages/subscriber/subscriber';

@NgModule({
  declarations: [
    MyApp,
    SchedulePage,
    ContactPage,
    HomePage,
    TabsPage,
    SideMenu,
    SettingPage,
    LoginPage,
    RoutePage,
    SchedulePage2,
    ViewRoutePage,
    RouteSearchResultPage,
    EditSchedulePage,
    SubscriberPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SchedulePage,
    ContactPage,
    LoginPage,
    HomePage,
    TabsPage,
    SideMenu,
    SettingPage,
    RoutePage,
    // SchedulePage2,
    // ViewRoutePage,
    // RouteSearchResultPage,
    // EditSchedulePage
    SubscriberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RouteService,
    Facebook,
    Push,
    GoogleService,
    NotifyService,
    DateTimeService,
    LocalNotifications,
    {
      provide: HttpService,
      deps: [XHRBackend, RequestOptions, NotifyService, Storage],
      useFactory: (backend, options, notifyService, storage) => {
        return new HttpService(backend, options, notifyService, storage);
      }
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
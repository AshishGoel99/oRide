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
import { IonicStorageModule  } from '@ionic/storage';
import { SideMenu } from "../pages/sideMenu/sideMenu";
import { SettingPage } from "../pages/setting/setting";
import { RouteService } from "../services/routeService";
import { GoogleService } from "../services/googleService";
import { UtilityService } from "../services/utilityService";
import { HttpService } from "../services/httpService";

@NgModule({
  declarations: [
    MyApp,
    SchedulePage,
    ContactPage,
    HomePage,
    TabsPage,
    SideMenu,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SchedulePage,
    ContactPage,
    HomePage,
    TabsPage,
    SideMenu,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RouteService,
    Facebook,
    Storage,
    GoogleService,
    UtilityService,
    HttpService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

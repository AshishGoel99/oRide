import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { environment } from '../environment';
import { LoginPage } from '../pages/login/login';
import { UserData } from '../models/userData';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SubscriberPage } from '../pages/subscriber/subscriber';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav;
  rootPage: any = TabsPage;
  userData: UserData = new UserData();
  showMenu: boolean = true;

  constructor(platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private localNotifications: LocalNotifications,
    private storage: Storage) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //Validate if user is logged in otherwise show him login page.
      this.validateUserLogin();

      this.localNotifications.on('click').subscribe(value => {
        console.log(value);
      });
    });
  }

  openSubscriberPage() {
    this.nav.push(SubscriberPage);
    this.showMenu = false;
  }

  private validateUserLogin(): void {
    let env = this;

    this.storage.get(environment.dataKey)
      .then(function (data) {

        if (data != null)
          env.userData = data;

        if (data != null) {
          //we don't have the user data so we will ask him to log in
          env.nav.push(LoginPage, {
            callback: (d) => {
              env.userData = d;
            }
          });
        }

        env.splashScreen.hide();
        env.statusBar.styleDefault();
      });
  }
}

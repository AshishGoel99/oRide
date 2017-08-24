import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Route } from "../route";
import { RouteService } from "../routeService";
import { googlemaps } from 'googlemaps';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { PopoverController } from 'ionic-angular';
import { SideMenu } from "../sideMenu/sideMenu";
import { GoogleService } from "../googleService";
import { UtilityService } from "../utilityService";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  from: string;
  to: string;
  fromPlace: any;
  toPlace: any;
  routes: Route[];

  constructor(public navCtrl: NavController,
    private utilityService: UtilityService,
    private routeService: RouteService,
    private fb: Facebook, private storage: Storage,
    private popoverCtrl: PopoverController,
    private googleService: GoogleService) {
  }

  ngOnInit() {

    this.storage.get("data").then(data => {
      if (data == null)
        this.userLogin();
    });

    this.googleService.setAutoComplete("from", (place) => {
      this.fromPlace = place;
    });
    this.googleService.setAutoComplete("to", (place) => {
      this.toPlace = place;
    });
  }

  private userLogin(): void {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        if (res.status == 'ok') {
          var token = this.addUser(res.authResponse.userID);
          //caching the token info
          this.storage.set("data", {
            token: token,
            userId: res.authResponse.userID
          });
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  //add user to System
  addUser(userId: string): string {
    return "";
  }

  private presentMenu(myEvent): void {
    let popover = this.popoverCtrl.create(SideMenu);
    popover.present({
      ev: myEvent
    });
  }

  private searchRoutes(): void {
    let loading = this.utilityService.showLoading();

    this.routeService.getRoutes(this.from, this.to)
      .then(routes => {
        this.routes = routes
        loading.dismiss();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { googlemaps } from 'googlemaps';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { PopoverController } from 'ionic-angular';
import { SideMenu } from "../sideMenu/sideMenu";
import { RouteService } from "../../services/routeService";
import { GoogleService } from "../../services/googleService";
import { Route } from "../../models/route";
import { HttpService } from '../../services/httpService';
import { environment } from '../../environment';


export class UserData {
  email: string;
  first_name: string;
  picture: string;
  username: string;
  userId: string;
  fbToken: string;
  apiToken?: string;
}

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
  userData: UserData;

  constructor(public navCtrl: NavController,
    private routeService: RouteService,
    private fb: Facebook, private storage: Storage,
    private popoverCtrl: PopoverController,
    private googleService: GoogleService,
    private httpService: HttpService) {
  }

  ngOnInit() {

    this.storage.get(environment.dataKey).then(data => {
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
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        if (res.status == 'ok') {

          this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
            this.userData = {
              email: profile['email'], first_name: profile['first_name'],
              picture: profile['picture_large']['data']['url'], username: profile['name'],
              userId: res.authResponse.userID, fbToken: res.authResponse.accessToken
            };

            this.addUser(this.userData, (res) => {
              if (res.success) {
                this.userData.apiToken = res.token;
                this.storage.set(environment.dataKey, this.userData);
              }
              else {

              }
            });
          });
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  //add user to System
  addUser(data: UserData, callback: (r: any) => void): void {
    this.httpService.post(environment.endpoints.userLogin, data)
      .subscribe(
      response => {
        callback(response.ok);
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  private presentMenu(myEvent): void {
    let popover = this.popoverCtrl.create(SideMenu);
    popover.present({
      ev: myEvent
    });
  }

  private searchRoutes(): void {
    this.routeService.getRoutes(this.from, this.to)
      .then(routes => {
        this.routes = routes
      });
  }
}

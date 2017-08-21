import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Route } from "../route";
import { RouteService } from "../routeService";
import { googlemaps } from 'googlemaps';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  from: String;
  to: String;
  routes: Route[];

  autocompleteItems: any;
  autocomplete: any;
  acService: any;
  placesService: any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private routeService: RouteService,
    private fb: Facebook, private storage: Storage) {
  }

  ngOnInit() {
    
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

    this.storage.get("data").then(data => {
      if (data == null)
        this.userLogin();
    });
  }

  userLogin(): void {
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

  chooseItem(item: any) {
    console.log('modal > chooseItem > item > ', item);
    this.autocomplete.query = item.description;
    this.autocompleteItems = [];
  }

  updateSearch() {
    console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query,
      componentRestrictions: { country: 'IN' }
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];
      predictions.forEach(function (prediction) {
        self.autocompleteItems.push(prediction);
      });
    });
  }

  private searchRoutes(): void {
    let loading = this.showLoading();
    loading.present();

    this.routeService.getRoutes(this.from, this.to)
      .then(routes => {
        this.routes = routes
        loading.dismiss();
      });
  }

  private showLoading(): Loading {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    return loading;
  }
}

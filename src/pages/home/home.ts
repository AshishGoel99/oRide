import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Route } from "../route";
import { RouteService } from "../routeService";
import { googlemaps } from 'googlemaps';

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
    private routeService: RouteService) {
  }

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  chooseItem(item: any) {
    console.log('modal > chooseItem > item > ', item);
    this.autocomplete.query=item.description;
    this.autocompleteItems=[];
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

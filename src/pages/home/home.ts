import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SideMenu } from "../sideMenu/sideMenu";
import { RouteService } from "../../services/routeService";
import { GoogleService } from "../../services/googleService";
import { Route } from "../../models/route";
import { DateTimeService } from '../../services/datetimeService';
import { ViewRoutePage } from '../routes/viewRoute';
import { Storage } from '@ionic/storage';
import { RouteSearchResultPage } from '../routes/routeSearchResult';
import { environment } from '../../environment';
import {} from 'googlemaps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  private minDate: string;
  private maxDate: string;

  private from: string;
  private to: string;
  private fromPlace: google.maps.places.PlaceResult;
  private toPlace: google.maps.places.PlaceResult;
  private frame: number;
  private date: string;

  constructor(public navCtrl: NavController,
    private routeService: RouteService,
    private googleService: GoogleService,
    private dateService: DateTimeService,
    private storage: Storage) {
  }

  ngOnInit() {

    this.googleService.setAutoComplete("from", (place) => {
      this.fromPlace = place;
    });
    this.googleService.setAutoComplete("to", (place) => {
      this.toPlace = place;
    });

    let now = new Date();
    console.log(now);
    this.date = this.dateService.ToLocalDateTime(now);

    this.minDate = this.dateService.ToLocalDateTime(now);
    console.log(this.minDate);
    now.setDate(now.getDate() + 10);
    this.maxDate = this.dateService.ToLocalDateTime(now);
    console.log(this.maxDate);
    this.frame = 2;
  }

  private routeStarted(routeId: string): void {
    this.routeService.setRouteStarted(routeId);
  }

  private searchRoutes(): void {
    //for testing only
    let env = this;
    // this.storage.get(environment.routeDataKey)
    //   .then(function (data) {
    //     env.navCtrl.push(RouteSearchResultPage, { routes: data });
    //     console.log(data);
    //   });

    let fromPoints = `POINT(${this.fromPlace.geometry.location.lat()} ${this.fromPlace.geometry.location.lng()})`;
    let toPoints = `POINT(${this.toPlace.geometry.location.lat()} ${this.toPlace.geometry.location.lng()})`;

    console.log(fromPoints);

    this.routeService.getRoutes(fromPoints, toPoints, this.frame, this.date) //this date is once sent to serve, would be parsed in UTC auto
      .then(routes => {
        console.log(routes);
        env.navCtrl.push(RouteSearchResultPage, { routes: routes });
      });
  }
}
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { googlemaps } from 'googlemaps';
import { PopoverController } from 'ionic-angular';
import { SideMenu } from "../sideMenu/sideMenu";
import { RouteService } from "../../services/routeService";
import { GoogleService } from "../../services/googleService";
import { Route } from "../../models/route";
// import { HttpService } from '../../services/httpService';
import { DateTimeService } from '../../services/datetimeService';
import { ViewRoutePage } from '../routes/viewRoute';
import { Storage } from '@ionic/storage';
import { environment } from '../../environment';
import { RouteSearchResultPage } from '../routes/routeSearchResult';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  private minDate: string;
  private maxDate: string;

  private from: string;
  private to: string;
  private fromPlace: any;
  private toPlace: any;
  private frame: number;
  private date: string;

  constructor(public navCtrl: NavController,
    private routeService: RouteService,
    private popoverCtrl: PopoverController,
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
    this.date = this.dateService.ToLocalDateTime(now);

    this.minDate = this.dateService.ToLocalDate(now);
    now.setDate(now.getDate() + 10);
    this.maxDate = this.dateService.ToLocalDate(now);
    this.frame = 2;
  }


  private presentMenu(myEvent): void {
    let popover = this.popoverCtrl.create(SideMenu);
    popover.present({
      ev: myEvent
    });
  }

  private searchRoutes(): void {
    //for testing only
    let env = this;
    this.storage.get(environment.routeDataKey)
      .then(function (data) {
        env.navCtrl.push(RouteSearchResultPage, { routes: data });
        console.log(data);
      });

    // this.routeService.getRoutes(this.from, this.to, this.frame,
    //   this.dateService.ToUtc(this.date))
    //   .then(routes => {
    //     env.navCtrl.push(RouteSearchResultPage, { routes: routes });
    //   });
  }
}

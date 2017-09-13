import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { googlemaps } from 'googlemaps';
import { PopoverController } from 'ionic-angular';
import { SideMenu } from "../sideMenu/sideMenu";
import { RouteService } from "../../services/routeService";
import { GoogleService } from "../../services/googleService";
import { Route } from "../../models/route";
import { HttpService } from '../../services/httpService';


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
    private routeService: RouteService,
    private popoverCtrl: PopoverController,
    private googleService: GoogleService) {
  }

  ngOnInit() {

    this.googleService.setAutoComplete("from", (place) => {
      this.fromPlace = place;
    });
    this.googleService.setAutoComplete("to", (place) => {
      this.toPlace = place;
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

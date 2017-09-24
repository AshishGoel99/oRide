import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from '../../models/route';
import { ViewRoutePage } from './viewRoute';


@Component({
    selector: 'page-routeSearchResult',
    templateUrl: 'routeSearchResult.html'
})

export class RouteSearchResultPage implements OnInit {
    private routes: Route[];

    constructor(private navCtrl: NavController,
        private navParams: NavParams) {
    }

    ngOnInit() {
        this.routes = this.navParams.get("routes");
    }

    private viewRoute(route: Route): void {
        this.navCtrl.push(ViewRoutePage, { route: route });
    }
}
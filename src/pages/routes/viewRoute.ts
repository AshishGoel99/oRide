import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Route } from '../../models/route';


@Component({
    selector: 'page-viewRoute',
    templateUrl: 'viewRoute.html'
})
export class ViewRoutePage implements OnInit {

    private route: Route;

    constructor(private navParams: NavParams,
        private nav: NavController) { }

    ngOnInit(): void {
        this.route = this.navParams.get("route");
        this.drawMap();
    }

    private isRouteDay(day: number): boolean {
        return this.route.days.indexOf(day) > -1;
    }

    private drawMap() {
        //TODO: draw map
    }
}
import { Component, OnInit } from '@angular/core';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';
import { environment } from '../../environment';
import { NavController } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';


@Component({
    selector: 'page-route',
    templateUrl: 'route.html'
})
export class RoutePage implements OnInit {

    private routes: Route[];

    constructor(private storage: Storage,
        private navCtrl: NavController) { }

    ngOnInit(): void {

        let env = this;
        this.storage.get(environment.routeDataKey)
            .then(function (data) {
                env.routes = data;
            });
    }

    private showSchedulePage(): void {
        this.navCtrl.push(SchedulePage);
    }
}
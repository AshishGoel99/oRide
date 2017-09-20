import { Component, OnInit, NgZone } from '@angular/core';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';
import { environment } from '../../environment';
import { NavController, ModalController } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import { EditSchedulePage } from '../schedule/editSchedule';

@Component({
    selector: 'page-route',
    templateUrl: 'route.html'
})
export class RoutePage implements OnInit {

    private routes: Route[];

    constructor(private storage: Storage,
        private navCtrl: NavController,
        private ngZone: NgZone,
        private modalCtrl: ModalController) { }

    ngOnInit(): void {

        let env = this;
        this.storage.get(environment.routeDataKey)
            .then(function (data) {
                env.routes = data;
                console.log(data);
            });
    }

    ionViewWillEnter(): void {
        this.ngZone.run(() => { });
    }

    private showSchedulePage(): void {
        this.navCtrl.push(SchedulePage);
    }

    private showEditPage(route: Route): void {
        let modal = this.modalCtrl.create(EditSchedulePage, { route: route });
        modal.present();
    }
}
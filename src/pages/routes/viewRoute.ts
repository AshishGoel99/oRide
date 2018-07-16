import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Route } from '../../models/route';
import { GoogleService } from '../../services/googleService';
import firebase from 'firebase';

@Component({
    selector: 'page-viewRoute',
    templateUrl: 'viewRoute.html'
})
export class ViewRoutePage implements OnInit {

    private route: Route;

    constructor(private navParams: NavParams,
        private nav: NavController,
        private googleService: GoogleService) { }

    ngOnInit(): void {
        this.route = this.navParams.get("route");
        this.drawMap();
    }

    private isRouteDay(day: number): boolean {
        return this.route.days.indexOf(day) > -1;
    }

    private drawMap() {
        console.log(this.route);
        this.googleService.drawMapFromRoute("map", this.route);
    }

    public viewLive() {
        firebase.initializeApp({
            apiKey: 'wzqJCdrIshGKX3mUclnAwWU4d5b39KlfUQyk4bhE',
            authDomain: 'oride-177404.firebaseapp.com',
            projectId: 'oride-177404'
        });

        // Initialize Cloud Firestore through Firebase
        let locref = firebase.firestore().collection('locations').doc(this.route.locRef);
        locref.onSnapshot(snap => {
            let data = snap.data();
            this.googleService.updateLiveLocation("map", data);
        });
    }
}
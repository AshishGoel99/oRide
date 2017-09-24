import { Component, OnInit } from '@angular/core';
import { MapElements } from "../../models/mapElements";
import { environment } from "../../environment";
import { RouteService } from '../../services/routeService';
import { DateTimeService } from '../../services/datetimeService';
import { NavController, NavParams } from 'ionic-angular';
import { Schedule } from '../../models/schedule';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-schedule2',
    templateUrl: 'schedule2.html'
})
export class SchedulePage2 implements OnInit {

    private maxDate: string;
    private minDate: string;

    private isShowMap: boolean;
    private schedule: Schedule;

    constructor(private dateService: DateTimeService,
        private nav: NavController, private navParams: NavParams,
        private routeService: RouteService,
        private storage: Storage) { }

    ngOnInit(): void {

        let now = new Date();
        this.minDate = this.dateService.ToLocalDate(now);
        now.setMonth(now.getMonth() + 2);
        this.maxDate = this.dateService.ToLocalDate(now);

        this.schedule = this.navParams.get("schedule");
        this.schedule.days = [];
        this.schedule.scheduleType = 0;
    }

    private next(): void {
        this.nav.push(SchedulePage2);
    }

    private selectDay(day: number): void {
        var index = this.schedule.days.indexOf(day);
        if (index > -1)
            this.schedule.days.splice(index, 1);
        else
            this.schedule.days.push(day);

        console.log(this.schedule.days);
    }

    private getSelectedDayClass(day: number): string {
        var index = this.schedule.days.indexOf(day);
        return index > -1 ? "primary" : null;
    }


    private saveSchedule(): void {

        let route: Route = {
            from: {
                latlng: this.schedule.mapElems.startLatLng,
                name: this.schedule.from.formatted_address
            },
            to: {
                latlng: this.schedule.mapElems.endLatLng,
                name: this.schedule.to.formatted_address
            },
            polyLine: this.schedule.mapElems.polyLine,
            polyGon: this.schedule.mapElems.polyGon,
            distance: this.schedule.mapElems.distance,
            startTime: this.schedule.goTime,
            returnTime: this.schedule.returnTime,
            scheduleType: this.schedule.scheduleType,
            days: this.schedule.days,
            date: this.schedule.date,//on server it would be auto parsed to UTC
            seatsAvail: this.schedule.seatsAvail,
            fare: this.schedule.price,
            vehicle: this.schedule.vehicleNo,
            contactNo: this.schedule.contactNo,
            waypoints: this.schedule.waypoints.map((c, i) => {
                return "POINT(" + c.place.geometry.location.lat() + " " + c.place.geometry.location.lng() + ")";
            }),
            bounds: JSON.stringify(this.schedule.mapElems.latLngBounds.toJSON())
        };

        console.log(route);

        let env = this;

        this.routeService
            .save(route)
            .subscribe(
            response => {
                // Emit list event
                console.log(response);
                let routeId = response.id;
                this.storage.get(environment.routeDataKey)
                    .then(value => {
                        
                        route.id = routeId;
                        let data = [route];
                        if (value != null) {
                            value.forEach(element => {
                                data.push(element);
                            });
                        }

                        this.storage.set(environment.routeDataKey, data)
                            .then(function () {
                                env.nav.popToRoot();
                            });
                    });

            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }
}
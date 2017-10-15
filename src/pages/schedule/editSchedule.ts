import { OnInit, Component } from "@angular/core";
import { Route } from "../../models/route";
import { NavParams, ViewController } from "ionic-angular";
import { DateTimeService } from "../../services/datetimeService";
import { RouteService } from "../../services/routeService";
import { environment } from "../../environment";
import { Storage } from '@ionic/storage';
import { NotificationService } from "../../services/notificationService";

@Component({
    selector: 'page-editSchedule',
    templateUrl: 'editSchedule.html'
})
export class EditSchedulePage implements OnInit {

    maxDate: string;
    minDate: string;
    callback: any;

    private route: Route;

    constructor(private navParams: NavParams,
        private dateService: DateTimeService,
        private viewCtrl: ViewController,
        private routeService: RouteService,
        private storage: Storage,
        private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.route = this.navParams.get("route");
        this.callback = this.navParams.get("callback");
        console.log(this.route);

        let now = new Date();
        this.minDate = this.dateService.ToLocalDate(now);
        now.setMonth(now.getMonth() + 2);
        this.maxDate = this.dateService.ToLocalDate(now);
    }

    private selectDay(day: number): void {
        var index = this.route.days.indexOf(day);
        if (index > -1)
            this.route.days.splice(index, 1);
        else
            this.route.days.push(day);

        console.log(this.route.days);
    }

    private getSelectedDayClass(day: number): string {
        var index = this.route.days.indexOf(day);
        return index > -1 ? "primary" : null;
    }

    private dismiss(): void {
        this.viewCtrl.dismiss();
    }

    private updateRoute(): void {
        let env = this;
        this.routeService.update(this.route)
            .subscribe(
            response => {
                // Emit list event
                this.storage.get(environment.routeDataKey)
                    .then((value: Route[]) => {

                        let newRoutes: Route[] = [];
                        if (value != null) {
                            value.forEach(element => {
                                newRoutes.push(element.id == env.route.id ? env.route : element);
                            });
                        }

                        this.storage.set(environment.routeDataKey, newRoutes)
                            .then(function () {
                                env.notificationService.ScheduleNotifications(newRoutes, () => {
                                    env.callback();
                                    env.viewCtrl.dismiss();
                                });
                            });
                    });
            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    private deleteRoute(): void {
        let env = this;
        this.routeService.delete(this.route.id)
            .subscribe(
            response => {
                // Emit list event
                this.storage.get(environment.routeDataKey)
                    .then((value: Route[]) => {

                        let newRoutes: Route[] = [];
                        if (value != null) {
                            value.forEach(element => {
                                if (element.id != env.route.id)
                                    newRoutes.push(element);
                            });
                        }

                        this.storage.set(environment.routeDataKey, newRoutes)
                            .then(function () {
                                env.notificationService.ScheduleNotifications(newRoutes, () => {
                                    env.callback();
                                    env.viewCtrl.dismiss();
                                });
                            });
                    });
            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }
}
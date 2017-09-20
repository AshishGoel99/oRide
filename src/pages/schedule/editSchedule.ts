import { OnInit, Component } from "@angular/core";
import { Route } from "../../models/route";
import { NavParams, ViewController } from "ionic-angular";
import { DateTimeService } from "../../services/datetimeService";
import { RouteService } from "../../services/routeService";
import { environment } from "../../environment";
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-editSchedule',
    templateUrl: 'editSchedule.html'
})
export class EditSchedulePage implements OnInit {

    maxDate: string;
    minDate: string;

    private route: Route;

    constructor(private navParams: NavParams,
        private dateService: DateTimeService,
        private viewCtrl: ViewController,
        private routeService: RouteService,
        private storage: Storage) { }

    ngOnInit(): void {
        this.route = this.navParams.get("route");
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
                console.log(response);
                this.storage.get(environment.routeDataKey)
                    .then((value: Route[]) => {

                        let data = [];
                        if (value != null) {
                            value.forEach(element => {
                                if (element.id == env.route.id)
                                    data.push(env.route);
                            });
                        }

                        this.storage.set(environment.routeDataKey, data)
                            .then(function () {
                                env.viewCtrl.dismiss();
                            });
                    });

            },
            err => {
                // Log errors if any
                console.log(err);
            });
    }
}
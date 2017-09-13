import { Injectable } from '@angular/core';
import { Route } from "../models/route";
import { HttpService } from './httpService';
import { environment } from '../environment';
import { Observable } from 'rxjs/Observable';

// const ROUTES: Route[] = [{
//     owner: "Ashish",
//     duration: 2,
//     from: "Hapur",
//     startTime: "07:30",
//     to: "Sector 144, Noida",
//     fare: 50,
//     vehicle: "WagonR"

// },
// {
//     owner: "Ashish",
//     duration: 2,
//     from: "Hapur",
//     startTime: "07:30",
//     to: "Sector 144, Noida",
//     fare: 50
// }];

@Injectable()
export class RouteService {

    constructor(
        private httpService: HttpService
    ) { }

    getRoutes(from: String, to: String): Promise<Route[]> {

        return Promise.resolve(null);

        //this.httpService.get(, )
    }

    save(data: Route): Observable<any> {
        return this.httpService.post(environment.endpoints.saveSchedule,
            {

            });
    }
}
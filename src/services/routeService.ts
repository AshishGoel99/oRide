import { Injectable } from '@angular/core';
import { Route } from "../models/route";
import { HttpService } from './httpService';
import { environment } from '../environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RouteService {

    constructor(
        private httpService: HttpService
    ) { }

    getRoutes(from: String, to: String, frame: number = 2, dateTime: string): Promise<Route[]> {

        return new Promise<Route[]>((resolve, reject) => {
            this.httpService
                .get(`from=${from}&to=${to}&timeFrame=${frame}&time=${dateTime}&`)
                .subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });

    }

    save(data: Route): Observable<any> {
        return this.httpService.post(environment.endpoints.saveSchedule,
            data);
    }

    update(data: Route): Observable<any> {
        return this.httpService.put(environment.endpoints.saveSchedule,
            data);
    }
}
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
                .get(environment.endpoints.schedule + `?From=${from}&To=${to}&Frame=${frame}&Time=${dateTime}`)
                .subscribe((data: Response) => {
                    resolve(data.json());
                }, error => {
                    reject(error);
                });
        });

    }

    setRouteStarted(id: string): void {
        this.httpService.get(environment.endpoints.scheduleStart).subscribe();
    }

    save(data: Route): Observable<any> {
        return this.httpService.post(environment.endpoints.schedule,
            data);
    }

    update(data: Route): Observable<any> {
        return this.httpService.put(environment.endpoints.schedule,
            data);
    }

    delete(id: string): Observable<any> {
        return this.httpService.delete(environment.endpoints.schedule,
            id);
    }
}
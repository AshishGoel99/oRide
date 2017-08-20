import { Injectable } from '@angular/core';
import { Route } from "./route";

const ROUTES: Route[] = [{
    Owner: "Ashish",
    Duration: 2,
    From: "Hapur",
    StartTime: "07:30",
    To: "Sector 144, Noida",
    Fare: 50,
    Vehicle: "WagonR"
},
{
    Owner: "Ashish",
    Duration: 2,
    From: "Hapur",
    StartTime: "07:30",
    To: "Sector 144, Noida",
    Fare: 50
}];

@Injectable()
export class RouteService {

    getRoutes(from: String, to: String): Promise<Route[]> {
        return Promise.resolve(ROUTES);
    }
}
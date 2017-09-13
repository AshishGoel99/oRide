import { location } from "./location";
import { MapElements } from "./mapElements";

export class Route extends MapElements {
    owner?: String;
    startTime: String;
    returnTime: string;
    duration?: number; // in hours
    from: location;
    to: location;
    note?: String;
    polyline: string;
    scheduleType: number;
    days: Array<number>;
    date: string;
    seatsAvail: number;
    fare: number;
    vehicle: string;
    contactNo: string;
    waypoints: Array<string>;
    bounds: string;
}
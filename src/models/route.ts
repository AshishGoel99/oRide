import { location } from "./location";
import { MapElements } from "./mapElements";

export class Route extends MapElements {
    id?: string;
    owner?: string;
    startTime: string;
    returnTime: string;
    // duration?: number; // in hours
    from: location;
    to: location;
    note?: string;
    polyLine: string;
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
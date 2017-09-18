import { MapElements } from "./mapElements";

export class Schedule {
    waypoints: Array<any>;
    days: Array<number>;
    scheduleType: number;
    distance: string;
    mapElems: MapElements;
    from: google.maps.places.PlaceResult;
    to: google.maps.places.PlaceResult;
    goTime: string;
    returnTime: string;
    date: string;
    seatsAvail: number;
    price: number;
    vehicleNo: string;
    contactNo: string;
}
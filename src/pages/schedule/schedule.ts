import { Component, OnInit } from '@angular/core';
import { GoogleService } from "../googleService";
import { MapElements } from "../mapElements";

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage implements OnInit {

  isShowMap: boolean;
  schedule: any;
  waypoints: any;
  fromPlace: any;
  toPlace: any;
  distance: string;

  constructor(private googleService: GoogleService) {
  }

  ngOnInit(): void {
    this.schedule = {
      from: '',
      to: ''
    };

    this.waypoints = [];

    this.googleService.setAutoComplete("origin", (place) => {
      this.schedule.from = place;
    });
    this.googleService.setAutoComplete("destination", (place) => {
      this.schedule.from = place;
    });
  }

  private addWayPoint(): void {
    if (this.waypoints.length < 5) {
      var newWaypoint = { id: "waypoint" + (this.waypoints.length + 1), place: null };
      this.waypoints.push(newWaypoint);

      setTimeout(() => {
        this.googleService.setAutoComplete(newWaypoint.id, (place) => {
          newWaypoint.place = place;
        });
      }, 200);
    }
  }

  private showMap(): void {
    if (this.schedule.from && this.schedule.to) {

      this.googleService.drawMapAndGetPolygon("map", this.waypoints, this.fromPlace, this.toPlace,
        (elems: MapElements) => {
          this.distance = elems.Distance;
          this.isShowMap = true;
        });
    }
  }
}
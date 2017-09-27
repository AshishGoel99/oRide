import { Component, OnInit, NgZone } from '@angular/core';
import { GoogleService } from "../../services/googleService";
import { NotifyService } from "../../services/notifyService";
import { MapElements } from "../../models/mapElements";
import { environment } from "../../environment";
import { Response } from '@angular/http';
import { RouteService } from '../../services/routeService';
import { DateTimeService } from '../../services/datetimeService';
import { NavController } from 'ionic-angular';
import { SchedulePage2 } from './schedule2';
import { Schedule } from '../../models/schedule';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage implements OnInit {

  private isShowMap: boolean;
  private schedule: Schedule;

  constructor(private googleService: GoogleService,
    private ngZone: NgZone,
    private notifyService: NotifyService,
    private routeService: RouteService,
    private nav: NavController) {
  }

  ngOnInit(): void {

    this.schedule = new Schedule();
    this.schedule.waypoints = [];

    this.googleService.setAutoComplete("origin", (place) => {
      this.schedule.from = place;
    });
    this.googleService.setAutoComplete("destination", (place) => {
      this.schedule.to = place;
    });
  }

  private addWayPoint(): void {
    if (this.schedule.waypoints.length < 5) {
      var newWaypoint = { id: "waypoint" + (this.schedule.waypoints.length + 1), place: null };
      this.schedule.waypoints.push(newWaypoint);

      setTimeout(() => {
        this.googleService.setAutoComplete(newWaypoint.id, (place) => {
          newWaypoint.place = place;
        });
      }, 200);
    }
  }


  private next(): void {
    this.nav.push(SchedulePage2, { schedule: this.schedule });
  }

  private showMap(): void {
    if (this.schedule.from && this.schedule.to) {

      this.isShowMap = true;
      this.notifyService.showLoading();

      this.googleService.drawMapAndGetPolygon("map", this.schedule.waypoints,
        this.schedule.from, this.schedule.to, (elems: MapElements) => {
          this.ngZone.run(() => {
            console.log(elems);
            this.schedule.mapElems = elems;
            this.schedule.distance = elems.distance;
            this.notifyService.hideLoading();
          });
        });
    }
  }

  ///Below Code executed on server side to Save.
  //     var query = "insert into Maps(Id,PolyLine,BoundE,BoundW,BoundN,BoundS,Polygon,GoTime,ReturnTime,Date,ScheduleDays,SeatsAvail,Price,ContactNo,StartLatLng,EndLatLng,Origin,Destination,VehicleNo,User_Id,CreatedOn) values({0},{1},{2},{3},{4},{5},GeomFromText('" + map.Polygon +
  //     "'),{6},{7},{8},{9},{10},{11},{12},GeomFromText('" + map.StartLatLng + "'),GeomFromText('" +
  //     map.EndLatLng + "'),{13},{14},{15},{16},{17})";
  // var result = DbContext.Database.ExecuteSqlCommand(query, id, map.Polyline, map.Bounds.east,
  // map.Bounds.west, map.Bounds.north, map.Bounds.south, map.GoTime, map.ReturnTime, map.Date,
  // string.Join(string.Empty, map.ScheduleDays), map.SeatsAvail, map.Price, map.ContactNo, map.Orig,
  // map.Dest, map.VehicleNo, userId, DateTime.Now);

  ///Below Code executes to retrieve data
  // var sP = positions[0];
  // var dP = positions[1];
  // var sLatLng = DbGeometry.FromText($"POINT({double.Parse(sP.Split('#')[0])} {double.Parse(sP.Split('#')[1])})");
  // var dLatLng = DbGeometry.FromText($"POINT({double.Parse(dP.Split('#')[0])} {double.Parse(dP.Split('#')[1])})");
  // var timeOfDay = DateTime.Now.TimeOfDay.Subtract(new TimeSpan(1, 0, 0));
  // var timeBuffer = timeOfDay.Add(new TimeSpan(interval, 0, 0));
  // var dayOfWeek = ((int)DateTime.Today.DayOfWeek).ToString();
  // var currentDate = DateTime.Now.Date;

  // var maps = DbContext.Maps.Take(10)
  //     .Where(m => m.Polygon.Contains(sLatLng) && m.Polygon.Contains(dLatLng) //if target route is in buffer area
  //             && m.SeatsAvail > 0 && m.User.Id != userId//checking seats availibility && only other people routes
  //             && (!string.IsNullOrEmpty(m.ScheduleDays) ? m.ScheduleDays.Contains(dayOfWeek) : currentDate.Equals(m.Date)) //if target route is on the same day
  //             && ((m.GoTime >= timeOfDay && m.GoTime <= timeBuffer && (m.StartLatLng.Distance(sLatLng) < m.StartLatLng.Distance(dLatLng)))
  //                 || (m.ReturnTime >= timeOfDay && m.ReturnTime <= timeBuffer && (m.EndLatLng.Distance(sLatLng) < m.EndLatLng.Distance(dLatLng)))) // matching time with time buffer and if route in same direction.
  //             );

}

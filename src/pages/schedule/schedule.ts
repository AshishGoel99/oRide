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

  private saveSchedule(): void {
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

    //below code is for retreive data and show on map
    // $scope.setRoute=function(ride){
    //   document.getElementById('searchMap').innerHTML="";
    //   var map = new google.maps.Map(document.getElementById('searchMap'), {
    //       zoom: 13,
    //       center: {lat: 22, lng: 77}  // India.
    //   });

    //   var path=google.maps.geometry.encoding.decodePath(ride.polyLine);

    //   var route = new google.maps.Polyline({
    //       path: path,
    //       geodesic: true,
    //       strokeColor: '#4285F4',
    //       strokeOpacity: 1.0,
    //       strokeWeight: 7
    //   });
    //   var infowindow = new google.maps.InfoWindow({
    //       content: "<img src='http://graph.facebook.com/"+ride.user.id+"/picture'/><br>"+ride.user.userName+"<br>Vehicle: <b>"+ride.vehicleNo+"</b><br> Seats: <b>"+ride.seatsAvail+"</b><br>Price: <b>"+ride.price+"/seat</b>.<br>Ph: <a href='tel:"+ride.contactNo+"'><b></a>"+ride.contactNo+"</b>",
    //       disableAutoPan:false
    //   });
    //   route.addListener('click',function(e){
    //       infowindow.setPosition(e.latLng);
    //       infowindow.open(map);
    //   });
    //   route.setMap(map);      
    //   addMarker(map,path[0]);
    //   addMarker(map,path[path.length-1]);

    //   var southWest = new google.maps.LatLng(ride.boundS,ride.boundW);
    //   var northEast = new google.maps.LatLng(ride.boundN,ride.boundE);
    //   var bounds = new google.maps.LatLngBounds(southWest,northEast);
    //   map.fitBounds(bounds);

    //   if(!localStorage.getItem("polyHelp"))
    //       {
    //           $ionicPopup.show({
    //               template: '<p>Tap on the route to get Ride Info.</p>',
    //               title: 'Help',
    //               buttons: [
    //               { text: 'Cancel' },
    //               {
    //                   text: 'Got it!',
    //                   type: 'button-positive',
    //                   onTap: function(e) {
    //                       localStorage.setItem("polyHelp","1");
    //                   }
    //               }
    //               ]
    //           });
    //       }
    //   };

    //   var addMarker=function(map,loc){
    //   var marker = new google.maps.Marker({
    //       position: loc,
    //       map: map
    //   });
    //   };
  }
}
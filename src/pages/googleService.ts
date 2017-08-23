import { Injectable } from '@angular/core';
import { MapElements } from "./mapElements";

@Injectable()
export class GoogleService {

    setAutoComplete(element, callback): void {
        // Google Places API auto complete
        let input = document.getElementById(element).getElementsByTagName('input')[0];
        let autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            // retrieve the place object for your use
            let place = autocomplete.getPlace();
            callback(place);
        });
    }

    drawMapAndGetPolygon(element, wayPoints, fromPlace, toPlace, callback): void {
        document.getElementById(element).innerHTML = "";
        var map = new google.maps.Map(document.getElementById(element), {
            zoom: 11,
            center: { lat: 22, lng: 77 }  // India.
        });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            map: map
        });

        directionsDisplay.addListener('directions_changed', function () {
            var resp = directionsDisplay.getDirections();
            let coords: MapElements = this.setMapVariables(resp);
            coords.Distance = this.computeTotalDistance(resp);
            callback(coords);
        });

        var wps = [];
        for (var i = 0; i < wayPoints.length; i++) {
            if (wayPoints[i].obj.getPlace())
                wps.push({ location: { 'placeId': wayPoints[i].obj.getPlace().place_id } });
        }

        this.displayRoute({ 'placeId': fromPlace.getPlace().place_id }, { 'placeId': toPlace.getPlace().place_id }, directionsService,
            directionsDisplay, wps, map);
    }

    private computeTotalDistance(result): string {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        console.log(total);
        return total + " Km";
    }

    private googleMaps2JTS(boundaries): any {
        var coordinates = [];
        var length = 0;
        if (boundaries && boundaries.getLength) length = boundaries.getLength();
        else if (boundaries && boundaries.length) length = boundaries.length;
        for (var i = 0; i < length; i++) {
            if (boundaries.getLength) coordinates.push(new jsts.geom.Coordinate(
                boundaries.getAt(i).lat(), boundaries.getAt(i).lng()));
            else if (boundaries.length) coordinates.push(new jsts.geom.Coordinate(
                boundaries[i].lat(), boundaries[i].lng()));
        }
        return coordinates;
    };

    private jsts2googleMaps(geometry): any {
        var coordArray = geometry.getCoordinates();
        var GMcoords = [];
        for (var i = 0; i < coordArray.length; i++) {
            GMcoords.push(new google.maps.LatLng(coordArray[i].x, coordArray[i].y));
        }
        return GMcoords;
    };

    private setMapVariables(resp): MapElements {
        var polyline = new google.maps.Polyline({
            path: [],
            strokeColor: '#FF0000',
            strokeWeight: 3
        });
        var bounds = new google.maps.LatLngBounds();

        var legs = resp.routes[0].legs;
        for (var i = 0; i < legs.length; i++) {
            var steps = legs[i].steps;
            for (var j = 0; j < steps.length; j++) {
                var nextSegment = steps[j].path;
                for (var k = 0; k < nextSegment.length; k++) {
                    polyline.getPath().push(nextSegment[k]);
                    bounds.extend(nextSegment[k]);
                }
            }
        }
        var mapElems = new MapElements();
        var polyLinePath = polyline.getPath();
        mapElems.Polyline = google.maps.geometry.encoding.encodePath(polyLinePath);
        mapElems.StartLatLng = "POINT" + polyLinePath.getAt(0).toString().replace(',', '');
        mapElems.EndLatLng = "POINT" + polyLinePath.getAt(polyLinePath.getLength() - 1).toString().replace(',', '');

        var overviewPath = resp.routes[0].overview_path,
            overviewPathGeo = [];
        for (var ii = 0; ii < overviewPath.length; ii++) {
            overviewPathGeo.push(
                [overviewPath[ii].lng(), overviewPath[ii].lat()]);
        }

        var distance = 3 / 111.12; // Roughly 3km
        var geoInput = this.googleMaps2JTS(overviewPath);
        var geometryFactory = new jsts.geom.GeometryFactory();
        var shell = geometryFactory.createLineString(geoInput);
        var polygon = shell.buffer(distance);

        var paths = this.jsts2googleMaps(polygon);
        var polygonStr = "";
        for (i = 0; i < paths.length; i++)
            polygonStr += "," + paths[i].lat() + " " + paths[i].lng();

        mapElems.Polygon = "POLYGON((" + polygonStr.substr(1) + "))";
        mapElems.Bounds = bounds;
        return mapElems;
    };

    private displayRoute(origin, destination, service, display, waypoints, mp): void {
        service.route({
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
            avoidTolls: true
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {

                var bounds = this.setMapVariables(response);
                mp.fitBounds(bounds);
                display.setDirections(response);
                //google.maps.event.trigger(mp, 'resize');
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });
    }
}
import {Component, OnInit, ViewChild} from '@angular/core';
import {MapService} from '../services/map.service';
import {DialogTypes} from '../enums';

declare var google: any;

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.component.html',
  styleUrls: ['./places-map.component.scss']
})
export class PlacesMapComponent  {

  // @ViewChild('mapContainer', {static: false}) mapContainer;
  //
  // public map: any;
  // public markersArray: any[] = [];
  // public geocoder = new google.maps.Geocoder();
  // private infowindow = new google.maps.InfoWindow();
  //
  //
  // constructor(private mapService: MapService) {
  //   this.mapService.getPlaceStream().subscribe(result => {
  //     switch (result.type) {
  //       case DialogTypes.REMOVE:
  //         this.markersArray[result.affectedIndex].setMap(null);
  //         this.markersArray.splice(result.affectedIndex, 1);
  //         break;
  //       case  result.affectedPlace.placeObj && DialogTypes.CREATE :
  //         this.createMarkerConditionPlaceObj(result.affectedPlace);
  //         break;
  //       case !result.affectedPlace.placeObj && DialogTypes.CREATE :
  //         this.createMarkerConditionNOTPlaceObj(result.affectedPlace);
  //       case DialogTypes.FILTER:
  //         this.updateMarkers(result.places);
  //         break;
  //       case DialogTypes.EDIT:
  //         this.editMarkerConditionPlaceObj(result);
  //         break;
  //     }
  //   });
  // }
  //
  // public createMarkerConditionNOTPlaceObj(obj) {
  //   this.geocoder.geocode({address: obj.address}, (results) => {
  //     const position = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
  //     const marker = new google.maps.Marker({
  //       position,
  //       animation: google.maps.Animation.DROP,
  //       map: this.map,
  //       id: obj.id
  //     });
  //     this.markersArray.push(marker);
  //     this.clickbyMarker(marker, obj);
  //   });
  // }
  //
  // ngOnInit() {
  //   this.getLocation();
  // }
  //
  // public editMarkerConditionPlaceObj(place): void {
  //   this.markersArray[place.affectedIndex].setMap(null);
  //   const newMarker = this.createNewMarker(place.affectedPlace);
  //   newMarker.setMap(this.map);
  //   this.markersArray.splice(place.affectedIndex, 1, newMarker);
  //   this.clickbyMarker(newMarker, place.affectedPlace);
  // }
  //
  // public createMarkerConditionPlaceObj(place): void {
  //   const marker = this.createNewMarker(place);
  //   this.markersArray.push(marker);
  //   this.clickbyMarker(marker, place);
  // }
  //
  //
  // public initMap(el, location) {
  //   this.map = new google.maps.Map(el, {
  //     center: {lat: location.coords.latitude, lng: location.coords.longitude},
  //     zoom: 5
  //   });
  //   this.clickbyMap();
  // }
  //
  // private getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (loc) => this.initMap(this.mapContainer.nativeElement, loc));
  //   }
  // }
  //
  // private clickbyMap(): void {
  //   let time;
  //   this.map.addListener('mousedown', (e) => {
  //     time = setTimeout(() => {
  //       this.mapService.openDialog(null, e).subscribe(newDialog => {
  //         if (newDialog) {
  //           this.mapService.addNewPlaceByPlaceObj(newDialog);
  //         }
  //       });
  //     }, 1000);
  //   });
  //   this.map.addListener('mouseup', () => {
  //     window.clearTimeout(time);
  //   });
  // }
  //
  //
  // private clickbyMarker(marker, place) {
  //   google.maps.event.addListener(marker, 'click', () => {
  //       this.infowindow.setContent(place.place);
  //       this.infowindow.open(this.map, marker);
  //     }
  //   );
  //   this.dblClickByMarker(place);
  // }
  //
  //
  // private dblClickByMarker(place) {
  //   const getMarkerByClicked = this.markersArray.find(marker => marker.id === place.id);
  //   const id = place.id;
  //   google.maps.event.addListener(getMarkerByClicked, 'dblclick', (e) => {
  //       this.mapService.openDialog(place, e).subscribe(editDialogValue => {
  //         if (editDialogValue) {
  //           editDialogValue.id = id;
  //           if (editDialogValue) {
  //             this.mapService.editPlaceAndMarker(editDialogValue);
  //           }
  //         }
  //       });
  //     }
  //   );
  // }
  //
  //
  // private updateMarkers(arr) {
  //   this.markersArray.forEach(marker => {
  //     const place = arr.find(item => item.id === marker.id);
  //     if (place) marker.setMap(this.map);
  //     else marker.setMap(null);
  //   });
  // }
  //
  //
  // private createNewMarker(obj: any) {
  //   const position = {lat: obj.placeObj.geometry.location.lat(), lng: obj.placeObj.geometry.location.lng()};
  //   return new google.maps.Marker({
  //     position,
  //     animation: google.maps.Animation.DROP,
  //     map: this.map,
  //     id: obj.id
  //   });
  // }

}

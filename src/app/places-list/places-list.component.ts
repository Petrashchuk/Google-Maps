import {Component, OnInit} from '@angular/core';
import {MapService} from '../services/map.service';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss']
})
export class PlacesListComponent implements OnInit {

  public places: any;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.mapService.getPlaceStream().subscribe(obj => {
      console.log(obj);
      this.places = obj.places;
    });
  }

  public removePosititonAndMarker(place) {
    this.mapService.removePlace(place.id);
  }


  public editModal(place) {
    const pos = {lat: place.placeObj.geometry.location.lat(), lng: place.placeObj.geometry.location.lng()};
    this.mapService.mapSenterConditionAddress(pos);
    const id = place.id;
    this.mapService.openDialog(place).subscribe(editDialogValue => {
      if (editDialogValue) {
        editDialogValue.id = place.id;
        this.mapService.editPlaceAndMarker(editDialogValue);
      }
    });
  }
}

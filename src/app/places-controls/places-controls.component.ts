import {Component, OnInit} from '@angular/core';
import {MapService} from '../services/map.service';


@Component({
  selector: 'app-places-controls',
  templateUrl: './places-controls.component.html',
  styleUrls: ['./places-controls.component.scss']
})
export class PlacesControlsComponent implements OnInit {


  constructor(private mapService: MapService) {}

  ngOnInit() {}

  public createPlace() {
    this.mapService.openDialog().subscribe(dialogValue => {
      if (dialogValue) {
          this.mapService.addNewPlaceByPlaceObj(dialogValue);
      }
    });
  }

  public getFile(event) {
    this.mapService.getExelData(event.target.files[0]);
    event.target.value = '';
  }

  public filterPlaces(e) {
    this.mapService.filterPlaces(e.target.value);
  }
}

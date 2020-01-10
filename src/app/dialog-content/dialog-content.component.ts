import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogTypes} from '../enums';

declare var google: any;

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainerSmall', {static: false}) mapContainer: ElementRef;
  @ViewChild('addressInput', {static: false}) addressInput: ElementRef;

  public checkType = false;
  public myForm: FormGroup;
  public isChoosenFromAutoComplete: boolean = true;


  private autocomplete;
  private map;
  private modalMarker = new google.maps.Marker();
  private geocoder = new google.maps.Geocoder();

  constructor(public dialogRef: MatDialogRef<DialogContentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.placeChangedHandler = this.placeChangedHandler.bind(this);
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      place: new FormControl(this.data.place, [Validators.required]),
      address: new FormControl(this.data.address, [Validators.required]),
      placeObj: new FormControl('')
    });
    if (this.data.type === DialogTypes.EDIT) {
      this.checkType = true;
    }
  }

  ngAfterViewInit() {
    if (this.data.hasOwnProperty('newCoords') && this.data.newCoords && Object.entries(this.data.newCoords).length && this.data.placeObj && this.data.type === DialogTypes.EDIT) {
      this.initMap(this.data.newCoords);
    }
    else if (this.data.placeObj && Object.entries(this.data.placeObj).length && this.data.type === DialogTypes.CREATE) {
      this.initMap({
        lat: this.data.placeObj.geometry.location.lat(),
        lng: this.data.placeObj.geometry.location.lng()
      });
    }
    else {
      this.getLocation();
      this.initMap();
    }

    this.addAutoCompleteToInput(this.addressInput.nativeElement, this.placeChangedHandler);
    if (this.data.placeObj && this.data.type === DialogTypes.EDIT && !this.data.e) {
      this.editModalSetMarker(this.data.placeObj);
    }
    else if (this.data.e && this.data.hasOwnProperty('e') && this.data.type === DialogTypes.CREATE) {
      this.getPLaceByCoordinates(this.data.e);
    }
    else if (this.data.address) {
      this.initMarkerByGeoCoder(this.data.address);
    }
  }


  public onSubmit(formValue) {
    if (formValue.place && formValue.placeObj) {
      this.dialogRef.close(formValue);
    }
    else this.isChoosenFromAutoComplete = false;
  }

  public closeModal(e) {
    e.preventDefault();
    this.dialogRef.close(null);
  }

  private initMarkerByGeoCoder(addres) {
    this.geocoder.geocode({address: addres}, (results, status) => {
      if (status === 'OK') {
        const position = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
        this.modalMarker = new google.maps.Marker({
          position,
          animation: google.maps.Animation.DROP,
          map: this.map,
          draggable: true
        });
        this.map.setCenter(position);
      }
      this.dragAfterDblClick(this.modalMarker);
    });
  }

  private dragAfterDblClick(marker) {
    google.maps.event.addListener(marker, 'dragend', () => {
      this.geocoder.geocode({latLng: marker.getPosition()}, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.myForm.controls.address.setValue(results[0].formatted_address);
          this.myForm.controls.placeObj.setValue(results[0]);
        }
      });
    });
  }

  private initMap(coords?) {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      zoom: 10
    });
    if (coords) {
      this.map.setCenter(coords);
    }
  }

  private getPLaceByCoordinates(coord) {
    const coords = {lat: coord.latLng.lat(), lng: coord.latLng.lng()};
    this.geocoder.geocode({latLng: coords}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results[0]);
        this.editModalSetMarker(results[0]);
        this.myForm.controls.address.setValue(results[0].formatted_address);
        this.map.setCenter(coords);
      }
      this.dragendMarker();
    });
  }

  private dragendMarker() {
    google.maps.event.addListener(this.modalMarker, 'dragend', () => {
        this.geocoder.geocode({latLng: this.modalMarker.getPosition()}, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            this.myForm.controls.address.setValue(results[0].formatted_address);
            this.myForm.controls.placeObj.setValue(results[0]);
          }
        });
      }
    );
  }

  private editModalSetMarker(placeObj) {
    debugger
    const config = {
      position: {lat: placeObj.geometry.location.lat(), lng: placeObj.geometry.location.lng()},
      animation: google.maps.Animation.DROP,
      map: this.map,
      draggable: true
    };
    this.modalMarker = new google.maps.Marker(config);
    this.dragendMarker();
  }


  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((val => {
        this.map.setCenter({lat: val.coords.latitude, lng: val.coords.longitude});
      }));
    }
  }

  private addAutoCompleteToInput(input: HTMLInputElement, callback): void {
    this.autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
    google.maps.event.addListener(this.autocomplete, 'place_changed', callback);

  }


  private placeChangedHandler() {
    this.isChoosenFromAutoComplete = true;
    if (this.modalMarker) {
      this.modalMarker.setMap(null);
    }
    const place = this.autocomplete.getPlace();

    this.myForm.controls.address.setValue(this.addressInput.nativeElement.value);
    this.myForm.controls.placeObj.setValue(place);
    const position = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
    this.modalMarker = new google.maps.Marker({
      position
    });
    this.map.setCenter(position);
    this.modalMarker.setMap(this.map);
  }

  ngOnDestroy() {
    this.checkType = false;
  }
}

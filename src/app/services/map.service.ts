import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {DialogContentComponent} from '../dialog-content/dialog-content.component';
import {DialogTypes} from '../enums';
import {MatDialog} from '@angular/material/dialog';
import * as XLSX from 'xlsx';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public newCoords: any;
  public geocoder = new google.maps.Geocoder();

  private places$: Subject<any> = new Subject();
  private places: any[] = [];

  constructor(public dialog: MatDialog) {
    this.openDialog = this.openDialog.bind(this);
  }

  public mapSenterConditionAddress(location) {
    this.newCoords = location;
  }


  public addNewPlaceByPlaceObj(obj: any): void {
    obj.id = new Date().getTime();
    this.places.push(obj);
    this.getFilteredPlaces(obj, false, DialogTypes.CREATE);
  }

  public addNewPlaceByExcelFile(obj: any) {
    this.geocoder.geocode({address: obj.address}, () => {
      obj.id = new Date().getTime();
      debugger
      this.places.push(obj);
      this.getFilteredPlaces(obj, false, DialogTypes.CREATEFROMFILE);
    });
  }

  public getPlaceStream() {
    return this.places$;
  }


  public removePlace(id: number) {
    const placeIndex = this.places.findIndex(item => item.id === id);
    this.places.splice(placeIndex, 1);
    this.getFilteredPlaces(null, false, DialogTypes.REMOVE, placeIndex);
    // this.places$.next({places: this.places, affectedIndex: placeIndex, type: DialogTypes.REMOVE});
  }

  public editPlaceAndMarker(objectInfobyPlace) {
    const placeIndex = this.places.findIndex(item => item.id === objectInfobyPlace.id);
    this.places.splice(placeIndex, 1, objectInfobyPlace);
    this.getFilteredPlaces(objectInfobyPlace, false, DialogTypes.EDIT, placeIndex);
    // this.places$.next({places: this.filteredArray, affectedPlace: objectInfobyPlace, affectedIndex: placeIndex, type: DialogTypes.EDIT});
  }

  public filterValue: string;
  public filteredArray: any;

  public filterPlaces(name: string): void {
    this.filterValue = name;
    this.getFilteredPlaces(null, true, DialogTypes.FILTER);
  }

  private getFilteredPlaces(obj, bool, type, index?) {
    debugger
    if (this.filterValue && bool) {
      this.filteredArray = this.places.filter(place => place.place.toLowerCase().includes(this.filterValue.toLowerCase()));
      this.places$.next({places: this.filteredArray, type});
    }
    else if (type === DialogTypes.EDIT && this.filterValue) {
      this.places$.next({places: this.filteredArray, affectedPlace: obj, affectedIndex: index, type});
    }
    else if (type === DialogTypes.EDIT && !this.filterValue) {
      this.places$.next({places: this.places, affectedPlace: obj, affectedIndex: index, type});
    }
    else if (this.filterValue && !bool) {
      this.filteredArray.push(obj);
      this.places$.next({places: this.filteredArray, affectedPlace: obj, type});
    }
    else if (type === DialogTypes.REMOVE) {
      this.places$.next({places: this.places, affectedIndex: index, type});
    }
    else if (!this.filterValue && !obj) {
      this.places$.next({places: this.places, type});
    }
    else this.places$.next({places: this.places, type, affectedPlace: obj});
  }

  public getExelData(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.addTXSLXFile(file)
        .then((data) => resolve(data));
    }).then((res: File[]) => {
      console.log(res);
      res.forEach(address => {
        this.addNewPlaceByExcelFile(address);
      });
    });
  };

  private addTXSLXFile(file: File): Promise<any> {
    return new Promise(resolve => {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: 'buffer'
        });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        resolve(XLSX.utils.sheet_to_json(worksheet));
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  public openDialog(place?, e?): any {
    let type;
    if (!place) {
      type = DialogTypes.CREATE;
      place = {};
    } else {
      type = DialogTypes.EDIT;
    }
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '500px',
      data: {
        place: place.place,
        address: place.address,
        placeObj: place.placeObj,
        type,
        e,
        newCoords: this.newCoords
      }
    });
    return dialogRef.afterClosed();
  }
}

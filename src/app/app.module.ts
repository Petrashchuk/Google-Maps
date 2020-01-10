import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {DialogContentComponent} from './dialog-content/dialog-content.component';
import {MatFormFieldModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModuleModule} from './module/module.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MapComponent } from './map/map.component';
import { PlacesControlsComponent } from './places-controls/places-controls.component';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesMapComponent } from './places-map/places-map.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogContentComponent,
    MapComponent,
    PlacesControlsComponent,
    PlacesListComponent,
    PlacesMapComponent
  ],
  entryComponents: [DialogContentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

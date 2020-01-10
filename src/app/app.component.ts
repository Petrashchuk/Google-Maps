import {Component, OnInit} from '@angular/core';

declare const google;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'google-app';


  ngOnInit() {
  }
}

import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDwZpOMUQyWBHJhw4bu8wMZKXHoKI_7_ZU',
      authDomain: 'sjsu-cs-160.firebaseapp.com'
    });
  }
}

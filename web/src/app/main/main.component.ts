import { Component, OnInit } from '@angular/core';
import {ServerService} from '../service/server.service';
import {AuthService} from '../service/auth.service';
import {Http} from "@angular/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  a: string;

  constructor(private http:Http, private serverService: ServerService, public authService: AuthService) {
  }

  ngOnInit() {
  }

  test() {

    this.http.get('http://localhost:3000/test').subscribe(
      (data) => {console.log(data)}
    )

  }
}

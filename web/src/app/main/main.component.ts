import { Component, OnInit } from '@angular/core';
import {ServerService} from '../service/server.service';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private reader: FileReader;

  constructor(private serverService: ServerService, public authService: AuthService) {
  }

  ngOnInit() {
  }

  upload() {
    //this.serverService.storeData();
  }
}

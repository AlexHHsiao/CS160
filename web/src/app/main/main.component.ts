import { Component, OnInit } from '@angular/core';
import {ServerService} from '../service/server.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private reader: FileReader;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  upload() {
    //this.serverService.storeData();
  }
}

import { Component, OnInit } from '@angular/core';
import {UploadService} from '../service/upload.service';
import {UploadModel} from '../model/upload.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  upload: UploadModel;
  file: File;

  constructor(private uploadService: UploadService) {}

  ngOnInit() {
  }

  onUpload() {
    const fileToUpload = this.file;
    //console.log(fileToUpload);
  }
}

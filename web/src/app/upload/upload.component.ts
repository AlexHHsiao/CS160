import { Component, OnInit } from '@angular/core';
import {UploadService} from '../service/upload.service';
import {UploadModel} from '../model/upload.model';
import * as _ from 'lodash';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  upload: UploadModel;
  file: FileList;
  uploadTitle: string;

  constructor(private uploadService: UploadService, private authService: AuthService) {
    this.uploadTitle = 'Upload Video';
  }

  ngOnInit() {
  }

  onUpload() {
    this.uploadService.setPath('/video-org');

    const fileToUpload = this.file;
    const fileIndex = _.range(fileToUpload.length);
    _.each(fileIndex, (idx) => {
      this.upload = new UploadModel(fileToUpload[idx]);
      this.uploadService.uploadFile(this.upload);
    });

    this.uploadTitle = 'Upload Video';
  }

  handleFile(event) {
    this.file = event.target.files;
    this.uploadTitle = event.target.files[0].name;
  }
}

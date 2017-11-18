import { Component, OnInit } from '@angular/core';
import {UploadService} from '../service/upload.service';
import {UploadModel} from '../model/upload.model';
import * as _ from 'lodash';
import {AuthService} from '../service/auth.service';
import {ServerService} from '../service/server.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  upload: UploadModel;
  file: FileList;
  uploadTitle: string;
  loading: boolean;
  fileName: string;
  resultUrl: string;
  readyUpload: boolean;
  uploadStart: boolean;

  dataSet: any;

  constructor(private uploadService: UploadService, private authService: AuthService,
              private serverService: ServerService) {
    this.uploadTitle = 'Choose Video';
    this.loading = true;
    this.dataSet = null;
    this.resultUrl = '';
    this.uploadStart = false;
    this.readyUpload = false;
  }

  ngOnInit() {
  }

  onUpload() {
    this.uploadService.setPath('/video-org');

    const blob = this.file[0].slice(0, -1, this.file[0].type);
    const newFile = new File([blob], this.authService.getEmail() + '.'
      + this.file[0].type.substr(6, this.file[0].type.length), {type: this.file[0].type});

    this.upload = new UploadModel(newFile);
    this.uploadService.uploadFile(this.upload);

    this.uploadTitle = 'Choose Video';
    this.readyUpload = false;
    this.loading = false;
    this.fileName = newFile.name;
    this.dataSet = null;
    this.uploadStart = true;
    this.resultUrl = '';
  }

  handleFile(event) {
    this.file = event.target.files;

    if (this.file.length !== 0) {
      this.uploadTitle = this.file[0].name;
      this.readyUpload = true;
    } else {
      this.readyUpload = false;
      this.uploadTitle = 'Choose Video';
    }
  }

  extractFrame() {

    this.loading = true;
    this.uploadStart = false;
    this.upload = null;

    let ffmpegData;

    this.uploadService.getFile(this.authService.getEmail()).then((data) => {
      ffmpegData = data;
      this.resultUrl = ffmpegData;
    });

    setTimeout(() => {
      console.log(this.resultUrl);
      this.loading = false;
    }, 90000);

    // this.serverService.extractFrame(this.fileName).subscribe(
    //   (data) => {
    //     console.log(data.json());
    //     ffmpegData = data.json();
    //     this.dataSet = ffmpegData;
    //   }, null, () => {
    //     this.loading = false;
    //   }
    // );
  }
}

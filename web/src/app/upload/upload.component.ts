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

  constructor(private uploadService: UploadService, private authService: AuthService,
              private serverService: ServerService) {
    this.uploadTitle = 'Upload Video';
    this.loading = true;
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

    this.uploadTitle = 'Upload Video';
    this.loading = false;
    this.fileName = newFile.name;
    console.log(this.fileName);
  }

  handleFile(event) {
    this.file = event.target.files;
    this.uploadTitle = event.target.files[0].name;
  }

  extractFrame() {
    this.serverService.extractFrame(this.fileName).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}

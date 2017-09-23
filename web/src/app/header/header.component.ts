import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {UploadService} from '../service/upload.service';
import {UploadModel} from '../model/upload.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nameChange: boolean;
  username: string;
  proImgChange: boolean;
  upload: UploadModel;
  file: FileList;
  uploadTitle: string;

  constructor(private router: Router, public authService: AuthService, public uploadService: UploadService) {
    this.nameChange = false;
    this.username = '';
    this.proImgChange = false;
    this.uploadTitle = 'Upload Profile Photo';
  }

  ngOnInit() {
  }
  register() {
    this.router.navigateByUrl('/signup');
  }

  signin() {
    this.router.navigateByUrl('/signin');
  }

  logout() {
    this.authService.logout();
  }

  changeUsername() {
    this.nameChange = false;
    this.authService.changeUsername(this.username);
    this.username = '';
  }

  onUpload() {
    this.uploadService.setPath('/profile-img');

    const fileToUpload = this.file;
    const fileIndex = _.range(fileToUpload.length);
    _.each(fileIndex, (idx) => {
      this.upload = new UploadModel(fileToUpload[idx]);
      this.uploadService.uploadFile(this.upload, 'user');
    });

    this.uploadTitle = 'Upload Profile Photo';
  }

  handleFile(event) {
    this.file = event.target.files;
    this.uploadTitle = event.target.files[0].name;
  }
}

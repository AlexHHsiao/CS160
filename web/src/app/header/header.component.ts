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

    const blob = this.file[0].slice(0, -1, this.file[0].type);
    const newFile = new File([blob], this.authService.getEmail() + '.'
      + this.file[0].type.substr(6, this.file[0].type.length), {type: this.file[0].type});

    this.upload = new UploadModel(newFile);
    this.uploadService.uploadFile(this.upload, 'user');

    this.uploadTitle = 'Upload Profile Photo';
  }

  handleFile(event) {
    this.file = event.target.files;
    this.uploadTitle = event.target.files[0].name;
  }
}

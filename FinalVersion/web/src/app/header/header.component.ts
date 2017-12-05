import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {UploadService} from '../service/upload.service';
import {UploadModel} from '../model/upload.model';

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

  homeBottom: string;
  homeLine: string;
  anaBottom: string;
  anaLine: string;
  infoBottom: string;
  infoLine: string;

  constructor(private router: Router, public authService: AuthService,
              public uploadService: UploadService) {
    this.nameChange = false;
    this.username = '';
    this.proImgChange = false;
    this.uploadTitle = 'Upload Profile Photo';
  }

  ngOnInit() {
    this.homeBottom = '5px solid #6692E8';
    this.homeLine = '40px';
    this.anaBottom = '';
    this.anaLine = '';
    this.infoBottom = '';
    this.infoLine = '';
  }

  goto(page: string) {
    switch (page) {
      case 'home':
        this.router.navigate(['']);
        this.homeBottom = '5px solid #6692E8';
        this.homeLine = '40px';
        this.anaBottom = '';
        this.anaLine = '';
        this.infoBottom = '';
        this.infoLine = '';
        break;
      case 'ana':
        this.router.navigate(['upload']);
        this.homeBottom = '';
        this.homeLine = '';
        this.anaBottom = '5px solid #6692E8';
        this.anaLine = '40px';
        this.infoBottom = '';
        this.infoLine = '';
        break;
      case 'info':
        this.router.navigate(['information']);
        this.homeBottom = '';
        this.homeLine = '';
        this.anaBottom = '';
        this.anaLine = '';
        this.infoBottom = '5px solid #6692E8';
        this.infoLine = '40px';
        break;
    }
  }

  register() {
    this.homeBottom = '';
    this.homeLine = '';
    this.anaBottom = '';
    this.anaLine = '';
    this.infoBottom = '';
    this.infoLine = '';
    this.router.navigateByUrl('/signup');
  }

  signin() {
    this.homeBottom = '';
    this.homeLine = '';
    this.anaBottom = '';
    this.anaLine = '';
    this.infoBottom = '';
    this.infoLine = '';
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

    if (this.file.length !== 0) {
      this.uploadTitle = event.target.files[0].name;
    }
  }
}

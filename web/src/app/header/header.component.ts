import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nameChange: boolean;
  username: string;
  profileUrl: string;

  constructor(private router: Router, public authService: AuthService) {
    this.nameChange = false;
    this.username = '';
    this.profileUrl = 'https://firebasestorage.googleapis.com/v0/b/sjsu-cs-160.' +
      'appspot.com/o/profile-img%2Fprofile-img.jpg?alt=media&token=5a3481f2-87bf-460a-bb04-ccb1ea98949a';
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
}

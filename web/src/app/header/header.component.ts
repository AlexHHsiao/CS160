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

  constructor(private router: Router, public authService: AuthService) {
    this.nameChange = false;
    this.username = '';
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

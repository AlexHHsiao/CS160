import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string;
  openModal: boolean;
  usernameFinish: boolean;

  constructor(public authService: AuthService, private router: Router) {
    this.openModal = false;
    this.username = 'No Name';
    this.usernameFinish = false;
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signupUser(email, password);
    this.openModal = true;
  }

  createUsername() {
    this.usernameFinish = true;
    this.authService.assignUsername(this.username);
  }

  gotoSignin() {
    this.openModal = false;
    this.usernameFinish = false;
    this.username = 'No Name';
    this.router.navigate(['/signin']);
  }
}

import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string;
  openModal: boolean;

  constructor(private authService: AuthService) {
    this.openModal = false;
    this.username = 'no name';
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.openModal = true;
    //this.authService.signupUser(email, password);
  }

  createUsername() {
    this.openModal = false;
  }
}

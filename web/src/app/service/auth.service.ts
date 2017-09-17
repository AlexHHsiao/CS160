import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  userCreated: boolean;
  errorMsg: string;
  nameChange: boolean;

  constructor(private router: Router) {
    this.userCreated = false;
    this.errorMsg = '';
    this.nameChange = false;
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        this.userCreated = true;
        this.errorMsg = '';

        firebase.auth().currentUser.updateProfile({displayName: 'No Name', photoURL: ''}).catch(
          (error) => console.log(error)
        );
      }
    ).catch(
      (error) => {
        console.log(error);
        this.errorMsg = error.message;
        this.userCreated = false;
      }
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        this.router.navigate(['']);
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.token = token
        );
      }
    ).catch(
      (error) => {
        console.log(error);
        this.errorMsg = error.message;
      }
    );
  }

  assignUsername(username: string) {
    firebase.auth().currentUser.updateProfile({displayName: username, photoURL: ''}).catch(
      (error) => console.log(error)
    );
  }

  getToken() {
    firebase.auth().currentUser.getToken().then(
      (token: string) => this.token = token
    );

    return this.token;
  }

  isAuth() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getUsername() {
    return firebase.auth().currentUser.displayName;
  }

  changeUsername(username: string) {
    firebase.auth().currentUser.updateProfile({displayName: username, photoURL: ''}).catch(
      (error) => console.log(error)
    );
  }
}

import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
  userCreated: boolean;
  errorMsgReg: string;
  errorMsgSign: string;
  nameChange: boolean;

  constructor(private router: Router) {
    this.userCreated = false;
    this.errorMsgReg = '';
    this.errorMsgSign = '';
    this.nameChange = false;
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        this.userCreated = true;
        this.errorMsgReg = '';

        firebase.auth().currentUser.updateProfile({displayName: 'No Name', photoURL: 'https://firebasestorage.googleapis.com/v0' +
        '/b/sjsu-cs-160.appspot.com/o/profile-img%2Fprofile-img.jpg?alt=media&token=5a3481f2-87bf-460a-bb04-ccb1ea98949a'}).catch(
          (error) => console.log(error)
        );
      }
    ).catch(
      (error) => {
        console.log(error);
        this.errorMsgReg = error.message;
        this.userCreated = false;
      }
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        this.errorMsgSign = '';
        this.router.navigate(['']);
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.token = token
        );
      }
    ).catch(
      (error) => {
        console.log(error);
        this.errorMsgSign = error.message;
      }
    );
  }

  assignUsername(username: string) {
    firebase.auth().currentUser.updateProfile({displayName: username, photoURL: 'https://firebasestorage.googleapis.com/v0/b/sjsu-cs-160.' +
    'appspot.com/o/profile-img%2Fprofile-img.jpg?alt=media&token=5a3481f2-87bf-460a-bb04-ccb1ea98949a'}).catch(
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

  getPhoto() {
    return firebase.auth().currentUser.photoURL;
  }

  getEmail() {
    return firebase.auth().currentUser.email;
  }

  changeUsername(username: string) {
    const photoUrl = firebase.auth().currentUser.photoURL;

    firebase.auth().currentUser.updateProfile({displayName: username, photoURL: photoUrl}).catch(
      (error) => console.log(error)
    );
  }

  changePhoto(photo: string) {
    const username = firebase.auth().currentUser.displayName;

    firebase.auth().currentUser.updateProfile({displayName: username, photoURL: photo}).catch(
      (error) => console.log(error)
    );
  }
}

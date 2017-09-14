import * as firebase from 'firebase';

export class AuthService {
  token: string;
  username: string;

  signupUser(username: string, email: string, password: string) {
    this.username = username;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      error => console.log(error)
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.token = token
        );
      }
    ).catch(
      error => console.log(error)
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
}

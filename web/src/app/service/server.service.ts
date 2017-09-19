import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';

@Injectable()

export class ServerService {

  constructor(private http: Http, private authService: AuthService) {
  }

  storeUser(user: any) {
    //const token = this.authService.getToken();
    return this.http.post('https://sjsu-cs-160.firebaseio.com/user.json', [{name: 'aaaa', id: 4444}]);
  }

  checkUsername() {

  }

  getUsername() {
    const token = this.authService.getToken();
  }

  testing() {
    // this.http.get('https://us-central1-sjsu-cs-160.cloudfunctions.net/helloWorld').subscribe(
    //   (data) => console.log(data)
    // );

    console.log(this.http.get('https://us-central1-sjsu-cs-160.cloudfunctions.net/helloWorld'));
  }
}

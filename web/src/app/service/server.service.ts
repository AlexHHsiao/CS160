import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';

@Injectable()

export class ServerService {

  constructor(private http: Http, private authService: AuthService) {
  }

  storeUsername() {
    return this.http.post('https://sjsu-cs-160.firebaseio.com/username.json', this.authService.username);
  }

  checkUsername() {

  }

  getUsername() {
    const token = this.authService.getToken();
  }
}

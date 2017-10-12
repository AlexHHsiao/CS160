import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from './auth.service';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()

export class ServerService {

  constructor(private http: Http, private authService: AuthService, private db: AngularFireDatabase) {
  }

  createURL(url_parts: { task?: string, req?: string }) {


    let url = 'https://us-central1-sjsu-cs-160.cloudfunctions.net';

    if (!url_parts.task) {
      return url;
    } else {
      url += '/' + url_parts.task;
    }

    let params = new URLSearchParams();

    if (url_parts.req) {
      params.set('text', url_parts.req);
    }

    url += '?' + params.toString();

    return url;
  }

  testing(text: string) {

    firebase.database().ref('video-org/').on('value', (snapshot) => {
      console.log(snapshot.val());
    });

/*    this.db.list('video-org/').subscribe(
      data => {
        console.log(data[0]);
      }
    );*/

    let url = this.createURL({task: 'addMessage', req: text});
/*    this.http.request(url, {withCredentials: true}).subscribe(
      (data) => console.log(data)
    );*/

/*    this.http.get('https://us-central1-sjsu-cs-160.cloudfunctions.net/addMessage').subscribe(
      data => {
        console.log(data.text());
      }
    );*/
  }
}

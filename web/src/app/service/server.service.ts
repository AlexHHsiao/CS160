import { Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Video} from './video';

@Injectable()

export class ServerService {

  constructor(private http: Http) {
  }

  storeData(data: Video) {
    this.http.put('gs://sjsu-cs-160.appspot.com/video-test', data);
  }
}

import {Injectable} from '@angular/core';
import {UploadModel} from '../model/upload.model';
import {AngularFireModule} from 'angularfire2';
import * as firebase from 'firebase';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {AuthService} from './auth.service';

@Injectable()
export class UploadService {

  private basePath;

  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase, private authService: AuthService) {
    this.basePath = '';
  }

  setPath(path: string) {
    this.basePath = path;
  }

  uploadFile(upload: UploadModel, user?: string) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      (): any => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        upload.email = this.authService.getEmail();

        if (user) {
          this.authService.changePhoto(upload.url);
        } else {
          this.saveFileData(upload);
        }
      }
    );
  }

  private saveFileData(upload: UploadModel) {
    this.db.list(`${this.basePath}/`).push(upload);
    this.db.object(`${this.basePath}/`).subscribe(
      data => {
        console.log(JSON.stringify(data));
      }
    );
    console.log('File saved!: ' + upload.url);
  }
}

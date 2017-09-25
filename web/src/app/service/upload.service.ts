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
          if (this.authService.getPhoto() === 'https://firebasestorage.googleapis.com/v0/b/sjsu-cs-160.' +
            'appspot.com/o/profile-img%2Fprofile-img.jpg?alt=media&token=5a3481f2-87bf-460a-bb04-ccb1ea98949a') {
            this.authService.changePhoto(upload.url);
          } else {
/*            const deleteTask = storageRef.child(`${this.basePath}/${this.authService.getEmail()}` + '.' + this.getImgType(this.authService.getPhoto()))
              .delete().then(
              () => {
                console.log('delete successfully');
              }
            );

            setTimeout(() => {
              this.authService.changePhoto(upload.url);
            }, 4000);*/

            this.authService.changePhoto(upload.url);
          }
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

  private getImgType(url: string) {
    if (url.includes('png')) {
      return 'png';
    } else if (url.includes('jpeg')) {
      return 'jpeg';
    }
  }
}

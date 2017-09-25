export class UploadModel {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  email: string;
  createdOn: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}

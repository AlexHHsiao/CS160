import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import {ServerService} from './service/server.service';
import {HttpModule} from '@angular/http';
import { UploadListComponent } from './upload/upload-list/upload-list.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    UploadListComponent,
    UploadFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

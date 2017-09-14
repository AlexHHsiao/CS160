import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import {ServerService} from './service/server.service';
import {HttpModule} from '@angular/http';
import { UploadListComponent } from './upload/upload-list/upload-list.component';
import { UploadFormComponent } from './upload/upload-form/upload-form.component';
import { UploadDetailComponent } from './upload/upload-detail/upload-detail.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {RouterModule, Routes} from '@angular/router';

const router: Routes = [
  {path: '', component: MainComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    UploadListComponent,
    UploadFormComponent,
    UploadDetailComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(router)
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

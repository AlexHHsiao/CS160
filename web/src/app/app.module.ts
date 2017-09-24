import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import {ServerService} from './service/server.service';
import {HttpModule} from '@angular/http';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './service/auth.service';
import {FormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { InformationComponent } from './information/information.component';
import { UploadComponent } from './upload/upload.component';
import {UploadService} from './service/upload.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import * as firebase from 'firebase';
import { FooterComponent } from './footer/footer.component';

firebase.initializeApp(environment.firebase);

const router: Routes = [
  {path: '', component: MainComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'information', component: InformationComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SignupComponent,
    SigninComponent,
    PageNotFoundComponent,
    DropdownDirective,
    InformationComponent,
    UploadComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(router),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [ServerService, AuthService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }

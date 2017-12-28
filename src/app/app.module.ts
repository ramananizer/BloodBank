import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{routing} from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule }    from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/my-guard.guard';
import {AuthenticationService, AlertService, UserService} from './_services/index';
import{fakeBackendProvider,JwtInterceptor} from './_helpers/index';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AddDonorComponent } from './add-donor/add-donor.component';
import { RequirementComponent } from './requirement/requirement.component';
import { MyrequirementsComponent } from './myrequirements/myrequirements.component';
import {MyRequirementsModule} from './myrequirements/myRequirements.module';
import { ResponseListComponent } from './response-list/response-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AddDonorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
   routing,
    HttpClientModule,
    MyRequirementsModule
  ],
  providers: [AuthGuard, AuthenticationService, AlertService,
   UserService
  //  ,
  //       {
  //           provide: HTTP_INTERCEPTORS,
  //           useClass: JwtInterceptor,
  //           multi: true
  //       },

        // provider used to create fake backend
      //  fakeBackendProvider
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }

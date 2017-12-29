import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import{RequirementComponent} from './requirement/requirement.component';
import { AuthGuard } from './_guards/my-guard.guard';
import {AddDonorComponent} from './add-donor/add-donor.component';
import{MyrequirementsComponent} from './myrequirements/myrequirements.component';

const appRoutes: Routes = [
    { path: '', component: MyrequirementsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, pathMatch:"full" },
    { path: 'register', component: RegisterComponent, pathMatch :"full" },
    //{ path: 'myRequirements', component: MyrequirementsComponent, pathMatch :"full" },//,
     { path: 'myRequirements', redirectTo: '/myRequirements' }//,
    // { path: 'myRequirements/:isPublic', redirectTo: '/myRequirements' }
    // { path: 'myRequirements/postRequirement', component: RequirementComponent, outlet:'popup' }
     //{ path: 'myRequirements/postRequirement', component: RequirementComponent, outlet:'popup' },
   // { path: 'myRequirements/requirement', component: RequirementComponent, outlet :'popup' },

    // otherwise redirect to home
   // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
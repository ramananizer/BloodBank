import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{MyrequirementsComponent} from './myrequirements.component';
import{RequirementComponent} from '../requirement/requirement.component';
import{AuthGuard} from '../_guards/my-guard.guard';

const requirementRoutes: Routes = [
  { path: 'postRequirement', component: RequirementComponent, outlet:'popup' },
 // { path: 'hero/:id', redirectTo: '/superhero/:id' },
  { path: 'myRequirements',  component: MyrequirementsComponent, canActivate: [AuthGuard] },
   { path: 'myRequirements/:isPublic',  component: MyrequirementsComponent, canActivate: [AuthGuard] }
 // { path: 'superhero/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(requirementRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MyrequirementsRoutingModule { }
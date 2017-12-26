import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{MyrequirementsComponent} from './myrequirements.component';
import{RequirementComponent} from '../requirement/requirement.component';

const requirementRoutes: Routes = [
  { path: 'postRequirement', component: RequirementComponent, outlet:'popup' },
 // { path: 'hero/:id', redirectTo: '/superhero/:id' },
  { path: 'myRequirements',  component: MyrequirementsComponent },
   { path: 'myRequirements/:isPublic',  component: MyrequirementsComponent }
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
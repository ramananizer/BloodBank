import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { RequirementComponent }    from '../requirement/requirement.component';
import { MyrequirementsComponent }  from './myrequirements.component';

//import { HeroService } from './hero.service';

import { MyrequirementsRoutingModule } from './myrequirements.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyrequirementsRoutingModule
  ],
  declarations: [
    RequirementComponent,
    MyrequirementsComponent
  ]//,
  //providers: [ HeroService ]
})
export class MyRequirementsModule {}
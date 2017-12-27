import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { RequirementComponent }    from '../requirement/requirement.component';
import { MyrequirementsComponent }  from './myrequirements.component';

//import { HeroService } from './hero.service';

import { MyrequirementsRoutingModule } from './myrequirements.routing.module';
import{Collapse} from '../directives/collapse';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyrequirementsRoutingModule
  ],
  declarations: [
    RequirementComponent,
    MyrequirementsComponent,
    Collapse
  ]//,
  //providers: [ HeroService ],
  
})
export class MyRequirementsModule {}
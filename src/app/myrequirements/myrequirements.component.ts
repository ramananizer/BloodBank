import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute} from '@angular/router';
import { AlertService, UserService } from '../_services/index';
import{Collapse} from '../directives/collapse';

@Component({
  selector: 'app-myrequirements',
  templateUrl: './myrequirements.component.html',
  styleUrls: ['./myrequirements.component.css'] 
})
export class MyrequirementsComponent implements OnInit {

  myRequirements : any;
  constructor(private router : Router,private userService : UserService,
  private route: ActivatedRoute ) { }
  isPublic : boolean;
  current: number = 0;
  ngOnInit() {
  
   this.route.params.subscribe(params =>{
      this.isPublic = params['isPublic'] != undefined;
       this.userService.fetchMyrequirements(this.isPublic).subscribe(x =>
      {
        this.myRequirements = x;
      }
    )
    }); 
  }

getDataTarget(i)
{
  return "#"+"collapse" + i;
}

getId(i)
{
  return "collapse" + i;
}
  postRequirement()
  {
    this.router.navigate([{ outlets: { popup: [ 'postRequirement' ] }}]);
  }
 
  responseItem : any;
  responseModel : any ={};
  respond(i)
  {
    if(this.myRequirements[i].responses != undefined)
    {
      this.responseModel = this.myRequirements[i].responses[0];
    }

    if(this.responseItem == i)
    {
      this.responseItem = -1;
    }
    else
    {
      this.responseItem = i;
    }
  }

  loading : boolean
  postResponse()
  {
    this.loading = true;
    this.responseModel.requirementId = this.myRequirements[this.current]._id;
    this.userService.postResponse(this.responseModel).subscribe(x =>
    {
      this.loading = false;
    })
  }
}

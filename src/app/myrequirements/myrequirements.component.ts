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
  responseModel : any;
  respond(i)
  {
    if(this.responseItem == i)
    {
      this.responseItem = -1;
    }
    else
    {
      this.responseItem = i;
    }
  }

  postResponse()
  {
    this.userService.postResponse(this.responseModel,this.myRequirements[this.current]);
  }
}

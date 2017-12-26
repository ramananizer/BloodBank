import { Component, OnInit } from '@angular/core';
import{Router, ActivatedRoute} from '@angular/router';
import { AlertService, UserService } from '../_services/index';

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

getIdHref(i)
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
}

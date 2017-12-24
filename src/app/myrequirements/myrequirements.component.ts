import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-myrequirements',
  templateUrl: './myrequirements.component.html',
  styleUrls: ['./myrequirements.component.css']
})
export class MyrequirementsComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  postRequirement()
  {
    this.router.navigate([{ outlets: { popup: [ 'postRequirement' ] }}]);
  }
}

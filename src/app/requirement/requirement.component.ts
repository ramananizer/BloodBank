import { Component, OnInit } from '@angular/core';
import { AlertService, UserService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {

  model : any ={};
  loading = false;
  constructor(private userService: UserService, 
        private alertService: AlertService,
        private _router : Router) { }

  ngOnInit() {
  }

  postRequirement()
  {
     this.loading = true;
        this.userService.createRequirement(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.closePopup();
                    //this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
  }


  cancel() {
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this._router.navigate([{ outlets: { popup: null }}]);
  }
}

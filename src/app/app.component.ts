import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _router : Router ){}

  get IsLoggedIn(): boolean
  {
    return localStorage.getItem('currentUser') != null;
  }

  logout()
  {
    localStorage.setItem('currentUser', null);
    this._router.navigate(['/login']);
  }

  goToPublicRequirements()
  {
    this._router.navigate(['/myRequirements', 1]);
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css']
})
export class ResponseListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

 @Input()
 public responseList : any[];
 
}

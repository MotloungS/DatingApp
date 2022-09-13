import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {

  }
  registerMode:boolean;
 
  registerToggle(){
    this.registerMode=!this.registerMode;
  }
  
  cancel(event:boolean){
    this.registerMode=event;
    
  }

}

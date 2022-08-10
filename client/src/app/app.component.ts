import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users:any;

constructor(private accountService: AccountService){
}
  ngOnInit() {
 
   //initially checks for user everytime after the constructor
   this.setCurrentUser();
  }

  setCurrentUser(){
    //Checking for a key in local storage and passing it out
    const user:User = JSON.parse(localStorage.getItem('user'));
    //calling the method in accountService
    this.accountService.setCurrentUser(user);
  }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl='https://localhost:5001/api/'
  //setting the observable for the user and assigning observable
  private currentUserSource = new ReplaySubject<User>(1)
  currentUser$=this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl + 'account/login',model).pipe(
      map((response:User)=>{
        const user=response;
        if(user){
          //Adding the user to the local storage with the key
          localStorage.setItem('user',JSON.stringify(user));
          //Assigning the user with the key
          this.currentUserSource.next(user);
        }
      })
    )
  }
register(model:any){
  return this.http.post(this.baseUrl + "account/register", model).pipe(
    map((user: User) =>{
      if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUserSource.next(user);
      }
     
    }
    
    )
  )
}
// dds

  //Assigning the user with the key (lookup)
  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    //deleting the user key from local storage
    this.currentUserSource.next(null);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  

  constructor(public account:AccountService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
//  ccc
  }
  login(){
   this.account.login(this.model).subscribe(response=>{
    this.router.navigateByUrl('/members');
    console.log(response);

   }, error=>{
        console.log(error)
       
    })
    }
    logout(){
      this.account.logout();
      this.router.navigateByUrl('/')
     
    }
   
  }


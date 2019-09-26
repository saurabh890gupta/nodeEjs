import { Component, OnInit } from '@angular/core';
import{AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  kaldat:boolean=false;
admin={
  email:'',
  password:''
}
  constructor(public authService:AuthServiceService,public router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('admintoken')){
      this.router.navigate(['/adminPanel']);
    }
  }
 
  heldat(event){
    console.log("event",event)
    this.kaldat=false;
  }
  submit(admin){
if(admin.email==""){
  this.kaldat=true
}
    console.log("hello admin data",admin)
    if(admin.email&&admin.password){
        this.authService.adminPanel(admin).subscribe((result:any)=>{
          if(result.message=="admin data find"){
            console.log("hello else part",result);
            sessionStorage.setItem('admintoken',result.token);
            var kal= JSON.stringify(result.result)
            sessionStorage.setItem('admindata',kal);    
            location.reload();
            this.router.navigate(['/adminPanel']);
           
          }else{
            
          }

        })
    }
    else{
      console.log("hello else part");
      this.kaldat=true
      // alert("both fields are required");

      
    }
  }
}

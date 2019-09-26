import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn:any;
  user_details:any;
  user_email:any;
  userEmail:any;
  userName:any;
  constructor(
    public authService:AuthServiceService,
    public router :Router,
    ) {
    this.isLoggedIn=localStorage.getItem('loggedIn');
    console.log("hello footer",this.isLoggedIn)
   }

  ngOnInit() {
    this.sessionData()
  }
  sessionData(){
    this.user_details=sessionStorage.getItem('user');
    this.user_email=JSON.parse(this.user_details)
    if(this.user_email){
      this.userEmail=this.user_email.email;
      this.userName=this.user_email.user_name;
      console.log("fjkdhvndjk",this.user_email.email,this.userName)
     }
    //  else{

    // }
    // console.log("fjkdhvndjk",this.user_email.email)
  }
  searchEmail(email){
    if(email){
      var obj={
        email:email
      }
      console.log("obj.email",obj.email)
      this.authService.searchEmail(obj).subscribe((data:any)=>{
        if(data.message=="successfully found user"){
          alert("successfully found user , you can login")
          location.reload();
          this.router.navigate(['login']);
        }else if(data.message=="user not found"){
          alert("user not found , first you register")
          location.reload();
          this.router.navigate(['signup']);
        }
      })
    }
    else{
      alert("plz enter email")
    }
  }

  sendOtp(){
    console.log( this.userEmail,"this.user_email");
    this.authService.changPasswordOtp(this.userEmail).subscribe((data:any)=>{
      if(data){
        console.log(data,"found");
        alert("otp send your email")
      }else{
        console.log("data errror");
      }
    })
  }
}

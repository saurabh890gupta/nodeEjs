import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceService} from '../services/auth-service.service'
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  obj={
    email:''
  }
  constructor(
   
    private authService:AuthServiceService,
    private router:Router,
    
  ) { }

  ngOnInit() {
  }
  msgAlert:String;
  forgrtData(obj){
    console.log("forget email obj",obj)
    if(!obj.email){
      // alert("email necessary!")
      this.msgAlert="email necessary!"
      return
    }
    else{
      this.authService.forgetEmail(obj).subscribe((response:any)=>{
        console.log("response data from",response);
        if(response.res){
          alert("check your email id for forget password link")
          window.location.reload();
          // window.location.href = 'https://gmail.com';  //this is use for same tab
          window.open('http://gmail.com'); //this open new tab

        }
        else if(response.err){
          alert("user not exist")
        }

      })

    }

  }
}

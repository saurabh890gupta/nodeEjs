import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService:AuthServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
  }
obj={
  name:'',
  email:'',
  pass:'',
  repeatPass:'',
  remember:''
}
isLoggedIn:any;
msgAlert:String;
  onSubmit(obj){
    if(obj.name=='' ||obj.email=='' ||obj.pass==''||obj.repeatPass==''){
      // alert("fill all fields") 
      this.msgAlert="All fields are required"
      return false
    }
    console.log("hello data ",obj)
    this.obj.name=obj.name,
    this.obj.email=obj.email,
    this.obj.pass=obj.pass,
    this.obj.repeatPass=obj.repeatPass,
    this.obj.remember=obj.remember,  
    console.log("signup all data find ",this.obj)
    if(this.obj.pass !=this.obj.repeatPass)
    {
      alert("password is not match")
      return;
    }
    this.authService.signupSubmit(obj)
        .subscribe((response:any) => {
          console.log("sign up response",response)
          // if(data=='success'){
          //   alert("you success fully registered")
            
          // }
          if (response.result=="user exist")
          {
            alert("you are already exsit you use your email id");
            this.router.navigate(['login']);
            return false;
          }
          else{
          //  alert("you ");
          
            if(response.result=="signup successful"){
              // if(response.token){
              //   sessionStorage.setItem('token',response.token)
              // }
              //   localStorage.setItem('loggedIn','true');
              //   this.isLoggedIn=localStorage.getItem('loggedIn');
              //   console.log("jkhjkhjkhjk", this.isLoggedIn)
                // location.reload();
                // alert("you are success fully ")    
                // this.router.navigate(['banner']);
                alert("you are success fully signup plz check your email and active your account")    
                window.location.reload();
                window.open('http://gmail.com');
                // this.router.navigate(['login']);
            }
            else{
              alert("somthing error");    
            }
          }
        })
  }

  
}

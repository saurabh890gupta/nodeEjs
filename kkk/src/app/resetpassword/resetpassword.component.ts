import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  courseForm: FormGroup;
  user_details:any;
  user_email:any;
  constructor( public authService:AuthServiceService,
    public router :Router, ) { }

  ngOnInit() {
    this.user_details=sessionStorage.getItem('user');
    this.user_email=JSON.parse(this.user_details)
    console.log(this.user_email.email,"just chillll");

    this.courseForm = new FormGroup({
      otp: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword:new FormControl(null, Validators.required),
   });
  }
  msgAlert:String;
  onSubmit(){
    console.log(this.courseForm.value);
    if(this.courseForm.value.password =='' || this.courseForm.value.confirmPassword==''||this.courseForm.value.otp==''){
      console.log("all fiels are required");
      // alert("all fiels are required")
      this.msgAlert="All fields are required"
    }else if(this.courseForm.value.password != this.courseForm.value.confirmPassword){
      console.log("password not match");
      alert("password not match")
    }else{
      var formdata={
        email:this.user_email.email,
        password:this.courseForm.value.password,
        confirmPassword:this.courseForm.value.confirmPassword,
        otp:this.courseForm.value.otp
      }
      this.authService.verifyOtpPssword(formdata).subscribe((data:any)=>{
        console.log(data,"what the data find")
        if(data.message){
          console.log("password change successfully");
          alert("password change successfully")
           this.router.navigate(['/']);
        }else if(data.error){
          console.log(data.error);
            alert(data.error)
            location.reload();
        }

      })
    }

  }
}

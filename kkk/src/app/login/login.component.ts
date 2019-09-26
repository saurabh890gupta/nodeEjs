import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 user_details:any;
 user_email={
  email:''
  }
  constructor(
    private authService :AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    //this is use for true false value of local storage in header
      this.isLoggedIn=localStorage.getItem('loggedIn');
    //this use for back button after login not redirect home page
      if(sessionStorage.getItem('token')){
        this.router.navigate(['banner']);
      }
  }
  formData={
    email: '',
    password: '',
    
  }
  obj={
    uname:'',
    pass:'',
    remember:''
  }
  isLoggedIn='';
 
  msgAlert:String;
 // isLoggedIn=localStorage.loggedIn ;
  onLogin(obj){
    if(obj.uname=='' ||obj.pass==''){
    // alert("fill all fields") 
    this.msgAlert="All fields are required"
    return false
  }
    this.formData.email=obj.uname,
    this.formData.password=obj.pass
    console.log("login data find",this.formData)
    this.authService.loginSubmit(this.formData)
    .subscribe((response:any) => {
      console.log("node login token data1",response,response.user_data);
      if(response.message=="your account not activate"){
        alert("your account not activate plz verifie your account in gmail") 
        return false 
      }

      console.log("node login token data",response.data);
      var obj=response.data; //dat take in obj for fetch
      console.log("obj",obj)
      var getdata=[];
      getdata.push(obj);  //we fetch particular data from array
      console.log("getdatafind",getdata[0]); //print array data
      if (getdata[0]==="login successful"){
        if(response.token) //for store token inlocalStorage.se local storage
        {
         var kal= JSON.stringify(response.user_data)
         
            sessionStorage.setItem('token',response.token);
            sessionStorage.setItem('user',kal);
        }
        localStorage.setItem('loggedIn','true');
        this.isLoggedIn=localStorage.getItem('loggedIn');
       this.user_details=sessionStorage.getItem('user');
       this.user_email=JSON.parse(this.user_details);
       console.log("fjkdhvndjk",this.user_email.email);
        console.log("jkhjkhjkhjk", this.isLoggedIn);
        location.reload();//this is necessary bcz localstorag value not isloggedin update
        alert("you are success fully login")    
        this.router.navigate(['banner']);
      }
      else{
        alert("email or password wrong");
      }
    })
  }
}

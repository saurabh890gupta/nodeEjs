import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isLoggedIn:any;
  user_data:any;
  user_id:any;
  constructor(
    private authService:AuthServiceService,
    private router: Router
  ) { }
obj={
  name:'',
  email:'',
  contact:'',
  address:'',
  query:'',
  user_id:'',
}
  ngOnInit() {
    this.isLoggedIn=localStorage.getItem('loggedIn');
    console.log(" this.isLoggedIn header", this.isLoggedIn)
  
  
    this.user_data=sessionStorage.getItem('user');
    console.log("user data find for property",JSON.parse(this.user_data).user_id);
    this.user_id=JSON.parse(this.user_data).user_id;
    console.log(" this.user_id find for property", this.user_id)
  }
  IsVisible: boolean = false;

    ShowHide(){
        this.IsVisible = this.IsVisible ? false : true;
    }

    ContactUs(obj){
      obj.user_id=this.user_id;
      console.log("obj",obj);
      if(!obj.email){
        alert("email necesary");
        return
      }
        this.authService.contactSubmit(obj).subscribe((response:any)=>{
          console.log("response of contact",response)
          if(response){
            console.log("successfully response",response)
              alert("your query successfully submit");
              // this.router.navigate(['contact']);
              this.IsVisible = false;
          }else{
            console.log("error responce",response)
            alert("somthing error");
          }
  
})
    }
}

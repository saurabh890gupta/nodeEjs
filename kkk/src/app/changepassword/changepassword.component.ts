import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
   urlEmail:String;
   viewShow:boolean=false;
  obj={
    repeatpass:'',
    pass:''
    
}
  constructor(
   public authService:AuthServiceService,
   private router: Router,
   private route: ActivatedRoute  //this is use for get search bar url 
  ) {
    
    //this is use for get search bar url 
   this.urlEmail= this.route.snapshot.queryParamMap.get('email'); 
   if( this.urlEmail){
    this.viewShow=true;
    console.log(this.urlEmail,"this is email for forget password") 
   }
   else{
    this.viewShow=false;
    this.router.navigate(['login']);
   }
 
  }

  ngOnInit() {
  }
  changPassword(obj){
    // this.urlEmail= this.route.snapshot.queryParamMap.get('email'); 
    console.log(atob(<any>this.urlEmail),this.urlEmail,"this is email for forget password") 
    //  obj.email=this.urlEmail  
        obj.email=atob(<any>this.urlEmail)
       console.log("objjjjjjjjjjjjjjjj",obj,obj.email)
      if(obj.repeatpass=='' && obj.pass==''){
        alert("password field empty");
        return false
      }
      
     else if(obj.repeatpass==obj.pass){

      this.authService.changPassword(obj).subscribe((res:any)=>{
          console.log("resonce for forget password",res)
          if(res.message=="your password change"){
            alert("password change succefully");
            this.router.navigate(['login']);
          }else{
            alert("somthing error in password change");
          }  
      })
      }else{
        alert("password is not match")
      }
  }
}

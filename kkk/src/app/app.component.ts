import { Component } from '@angular/core';
// import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  isset:boolean=false;
  constructor(
   ) {

   }
 
  ngOnInit(){
    console.log("heloo",window.location.href);
    if(window.location.href=="http://localhost:4200/admin"|| window.location.href=="http://localhost:4200/adminPanel"){
     this.isset=true;
    }
  }
    
  
}

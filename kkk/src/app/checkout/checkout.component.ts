import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { AuthServiceService } from "../services/auth-service.service";



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  total:any;
  sum:any;
  user_data:any;
  user_id:any;
  checkOutData:boolean=false;
  data_target:any;
  checkOut={
    firstName:'',
    lastName:'',
    address:'',
    postcode:'',
    city:'',
    State:'',
    country:'',
    paymentMethod:'',
    termCondtion:'',
    mobile:''

  }
  constructor(
    public activeroute:ActivatedRoute,
    public authService:AuthServiceService,
    public router:Router,
    // public event:NavigationStart,
    ) {
      this.user_data=sessionStorage.getItem('user');
    console.log("user data find for property",JSON.parse(this.user_data).user_id);
    this.user_id=JSON.parse(this.user_data).user_id;
    console.log(" this.user_id find for property", this.user_id)
     }

  ngOnInit() {debugger
   
    this.total = this.activeroute.queryParams.subscribe(params => {
      // this.id = +params['ind']; // (+) converts string 'id' to a number
        console.log("held sum find",params.sum)
        this.sum=params.sum
      });
      console.log("outer sum find",this.sum);
     
      // window.history.forward(); 
     // history.go(-1); this use for forword back word -1,-2,1
      // history.pushState(0,null) //this use for browser forword button not forword for next page

     
  }
  state=[
    {id: 0, name: "Andhra Pradesh"},
    {id: 1, name: "Arunachal Pradesh"},
    {id: 2, name: "Assam"},
    {id: 3, name: "Bihar"},
    {id: 4, name: "Chhattisgarh"},
    {id: 5, name: "Goa"},
    {id: 6, name: "Gujarat"},
    {id: 7, name: "Haryana"},
    {id: 8, name: "Himachal Pradesh"},
    {id: 9, name: "Jammu & Kashmir"},
    {id: 10, name: "Jharkhand"},
    {id: 11, name: "Karnataka"},
    {id: 12, name: "Kerala"},
    {id: 13, name: "Madhya Pradesh"},
    {id: 14, name: "Maharashtra"},
    {id: 15, name: "Manipur"},
    {id: 16, name: "Meghalaya"},
    {id: 17, name: "Mizoram"},
    {id: 18, name: "Nagaland"},
    {id: 19, name: "Odisha"},
    {id: 20, name: "Punjab"},
    {id: 21, name: "Rajasthan"},
    {id: 22, name: "Sikkim"},
    {id: 23, name: "Tamil Nadu"},
    {id: 24, name: "Telangana"},
    {id: 25, name: "Tripura"},
    {id: 26, name: "Uttarakhand"},
    {id: 27, name: "Uttar Pradesh"},
    {id: 28, name: "West Bengal"},
    ];
    country=[
      {id: 0, name: "India"},
    ]
  
    submitCheckOut(checkOut){debugger
     
      if(checkOut.firstName==''&& checkOut.lastName==""&&checkOut.address==''&&checkOut.postcode==''&&checkOut.city==''&&checkOut.State==''){
        alert("all fields are required")
        return false;
      }
      else{
        console.log("check out data find",checkOut)
        this.authService.submitCheckOut(checkOut,this.user_id).subscribe((data:any)=>{
          console.log("data find submitCheckOut555555",data)
          if(data){
            console.log("data find submitCheckOut555555",data)
              console.log("data find submitCheckOut",data.data._id)
              // location.reload();
              this.router.navigate(['/Paymentpage'], { queryParams: { sum:this.sum, addressDataId:data.data._id,} });
            
              }
            
          else{
            console.log("data not find submitCheckOut",data)
          }
        })
      }
    }

   


}

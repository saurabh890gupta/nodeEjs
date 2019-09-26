import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.css']
})
export class ShowPropertyComponent implements OnInit {
result:any;
imgData= [];
multiImageData=[];
somthing=[];
tempdata=[];
localCartData1:any;
localCartData2:any;
IsVisible=false;
isLoggedIn:any;
array=[]
kal:any;
count=0;
getArry=[]
propertyShowImage:any;
  constructor(
    private authService:AuthServiceService,
    private router: Router,
    // private toastr: ToastrService
  ) {

 
   }
sum=0;
  ngOnInit() {
    this.isLoggedIn=localStorage.getItem('loggedIn');
    console.log("hello get syd",this.isLoggedIn);
    this.localCartData1=sessionStorage.getItem("cart");
    this.localCartData2=JSON.parse(this.localCartData1)
    this.array=this.localCartData2
    // console.log("this.cal data paper", this.localCartData2 , this.array)
    if(this.localCartData2==null)
    {
      this.array=[];
      this.count=0;
    }else{
      this.array.forEach(jml=>{
       this.count=this.count+ jml.quentity
      })
     console.log("fsdjfsdf",this.count)
    }

    // this.authService.propertyShow()
    // .subscribe((response:any) => {
    //   this.result=response
    //   console.log("propertyscrollj",this.result);
    //     });
        this.image();
  }
 
  image()
    {
      this.authService.ImageShow()
      .subscribe((response:any) => {
        // console.log("response response", response)
        this.somthing=response.res
        this.tempdata=this.somthing;
       console.log("response response",response.res)
      
       response.res.forEach((multiImage)=>{
        multiImage.propertyShowImage.forEach((inside)=>{
          this.getArry.push("http://localhost:5050/" + inside)
          })
        })
        console.log("get image overall images inside single array",   this.getArry)
       
        response.res.forEach((multiImage)=>{
         this.multiImageData.push(multiImage.propertyShowImage)
       })
       console.log("get image in array inside array", this.multiImageData)
        
       response.res.forEach((data)=>{
          //console.log("response response",data)
          this.imgData.push('http://localhost:5050/' + data.propertyimage)
          // multiImageData.push()
        })

        // this.imgData.forEach((element) => {
        //   console.log("aaaa", element);
        //   //element   += 'http://localhost:4000' 
        // });
       // console.log("data", this.imgData);
      });
    }
    detailsShow(ind){
      if(sessionStorage.getItem('token')){

     
      // console.log("hello data",ind )
      // this.router.navigate(['propertydetail'],{ queryParams: { ind: ind,data:data} }) ;
      this.router.navigate(['/propertydetail'], { queryParams: { ind: ind, } });

      }else{
        alert("you are not login firstly login")
      // this.showSuccess()
      }
    }
    // showSuccess() {
    //   this.toastr.success('Hello world!', 'Toastr fun!');
    // }
    searchEnter(event){
      const value=event.target.value;
      console.log("valueeee",value);
      this.IsVisible=false;
      if(value==undefined){
        this.image();
        return
      }
      if(value==''){
        this.image();
      }
      if (value.length>=1) { 
        this.somthing= this.tempdata.filter(f=>{
          if(f && f.propertyname.toLowerCase().indexOf(value.toLowerCase())>-1 || f.propertycity.toLowerCase().indexOf(value.toLowerCase())>-1){
          // if(f && f.propertyname.indexOf(value)>-1 || f.propertycity.indexOf(value)>-1){  //WITH OUT UPPER CASE
            return f;
          }
        })
        if(this.somthing.length==0){
          this.IsVisible=true;
         }
      }
      else{
        this.somthing=[];
      }

    }
    quentity:any;
    cartData:any;
    addCart(ind, data,city, state, status,image,price,dataId){debugger
             console.log("array data find",this.array,dataId)
            // console.log(" this.count  fsdadsffind", this.count)
            let flag=false;
            this.array.forEach((jk,index)=>{
              // console.log("jk",jk,index)
              // console.log("indexing",jk.ind,ind, )
              if(jk.ind==ind){
                console.log("dffdf",jk.ind,ind,index )
                this.array[index].quentity = jk.quentity+1;
                if( this.array[index].quentity<=3){
                  this.count=this.count+1;
                }
                if( this.array[index].quentity>3){
                  this.count=this.count
                  this.array[index].quentity=3;
                  alert("you can not more then 3")
                }
                flag=true;
              }  
            })
            if(!flag){
              this.count=this.count+1
              this.quentity=1;
              this.array.push({ind:ind,name:data,city:city,state:state,status:status,image:image,price:price,quentity:this.quentity,data_id:dataId});
            }
            this.cartData=JSON.stringify(this.array);
            sessionStorage.setItem("cart", this.cartData)     
            console.log("jkfhdhfjsdhf",this.array)
    }
   
    openCart(){
     
      if(this.count!=0){
        this.router.navigate(['/openCart']);
      }
       else{
         alert("firstly some add in cart")
       }
    }

}

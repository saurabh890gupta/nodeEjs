import { Component, OnInit } from '@angular/core';
import { makeDecorator } from '@angular/core/src/util/decorators';
import {Router}from '@angular/router'
@Component({
  selector: 'app-open-cart',
  templateUrl: './open-cart.component.html',
  styleUrls: ['./open-cart.component.css']
})
export class OpenCartComponent implements OnInit {
  localCartData1:any;
  localCartData2:any;
  array=[]
  count=0;
  name:any;
  paul=[];
  image:any;
  cartDataDelete:any;
  uniqueUsers=[];
  textCart:boolean=false;
  subtotal=0;
  argutotal=0;
  counting:any;
  madalIndex:number;
  modalArray=[]
  
  constructor(public router:Router) { }
    ngOnInit() {
      this.cartData();
    }
  cartData(){
    this.localCartData1=sessionStorage.getItem("cart");
    this.localCartData2=JSON.parse(this.localCartData1)
    console.log(this.localCartData2)
    this.array=this.localCartData2;
    console.log("this array333333", this.array)
    this.modalArray=this.array;
    console.log("this array",  this.array[0].image[0],this.modalArray)
   if(this.array.length==0){
    this.textCart=true;
   }
    // console.log("this.cal data paper", this.localCartData2,this.array)  
    // this.array.forEach(u=>{
    //   if(!this.uniqueUsers.find(x=>x.ind==u.ind)){
    //     let num=0;
    //     this.array.forEach(ele=>{
    //         if(ele.ind==u.ind){
    //           num++
    //         }
    //       }
    //     )
    //    u.count=num;
    //    this.uniqueUsers.push(u);
    //   }
    // })
    // console.log("unique user",this.uniqueUsers)
    if(this.localCartData2==null)
    {
      this.array=[];
      this.count=0;
     

    }else{
      
      this.count=this.localCartData2.length;
    this.fullTotal();
    }
  }
  fullTotal(){
    this.argutotal=0;
    this.array.forEach((gst,index)=>{
      console.log("hy",Number(gst.quentity),Number(gst.price))
      this.subtotal=Number(gst.quentity)*Number(gst.price)
      console.log("hy daaa", this.subtotal)
      this.argutotal= this.argutotal+ this.subtotal
    })
    console.log(" this.subtotal this.subtotal", this.subtotal, this.argutotal)
  }
 
  trash(ind){
      // console.log("imfffff",ind);
      alert("Are you sure you want to remove this product")
      this.array.forEach((r,index)=>{
        // console.log("innnnn",index,ind,r.ind)
        if(index==ind){
        var removed = this.array.splice(ind, 1);
        // console.log("fjgdfjghdfjkg",removed)
        }
      })
      // console.log("fjgdfjghdfjkg",this.array)
      this.cartDataDelete=JSON.stringify(this.array);
            sessionStorage.setItem("cart", this.cartDataDelete)     
            // console.log("jkfhdhfjsdhf",this.array)
            location.reload();
  }

  quantityButton(ind,data){
    // console.log("dataaaaaaa",ind,data)
    if(data==-1){
      // console.log("quantity",this.array[ind].quentity-1)
      this.counting=this.array[ind].quentity-1
      this.array[ind].quentity=this.counting
      // console.log("this.counting",this.counting)
      if(this.counting<1){
        this.array[ind].quentity=1;
        alert("you cant not less then 1")
      }
    }
    else{
      // console.log("dataaaaaaa++++++++",data,this.array[ind].quentity) 
      this.counting=this.array[ind].quentity+1;
      this.array[ind].quentity=this.counting;
      // console.log("this.countingjghjghjghj",this.counting)
      if(this.counting>3){
        this.array[ind].quentity=3;
        alert("you cant not grater then 3")
      }
    }
    this.cartDataDelete=JSON.stringify(this.array);
            sessionStorage.setItem("cart", this.cartDataDelete)   
    console.log("jkfhdhfjsdhf",this.array)
    this.ngOnInit();
  }
  cartProcess(sum){
    console.log("summmmmmmmmm",sum)
    
    this.router.navigate(['/checkOut'], { queryParams: { sum: sum, } });

  }
  openFun(ind){
    console.log("indexing passs data",typeof(ind),ind);  
    this.madalIndex=ind;
// console.log("this.array[this.madalIndex].image",this.array[this.madalIndex].image)
  }
}

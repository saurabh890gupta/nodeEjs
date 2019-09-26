import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  imageSrc: any;
  filename:any;
  selectedFile:File;
  helImg=[];
  getimg:File;
  urls = [];
  totalImage:any;
  user_data:any;
  user_id:any;
  property={
    propertyname:'',
    propertyprice:'',
    phone:'',
    propertydescreption:'',
    propertystate:'',
    propertycity:'',
    propertystatus:'',
    propertyleaseperioud:'',
    propertyminbed:'',
    propertyarea:'',
    propertySwimmingpool:'',
    propertyStories:'',
    propertyexit:'',
    propertyrireplace:'',
    propertylaundryroom:'',
    propertyJogpath:'',
    propertyCeilings:'',
    propertyDualsink:'',
    propertyVideo1:'',
    propertyVideo2:'',
    propertyVideo3:'',
    checkBox:'',
    user_id:this.user_id,
  }
  constructor(  private authService :AuthServiceService,
    private router: Router) { }
      isLoggedIn:any;
        ngOnInit() { 

   this.user_data=sessionStorage.getItem('user');
   console.log("user data find for property",JSON.parse(this.user_data).user_id);
   this.user_id=JSON.parse(this.user_data).user_id;
   console.log(" this.user_id find for property", this.user_id)
  }
 //for tab system of property  
  tab = 1;
  setTab(newTab){
    this.tab = newTab;

  }
  isSet (tabNum){
      return this.tab === tabNum;
  };
//for tab system of property  
//this comment also for tab system
    //   stepFirst:boolean = true;
    // stepSecond:boolean=false;
    // stepThird:boolean=false;
    // stepFour:boolean=false;
    // setTab(newTab){debugger
    //   this.tab = newTab;
    //   if(this.tab == 1){
    //     this.stepFirst=true;
    //     this.stepSecond=false;
    //     this.stepThird=false;
    //     this.stepFour=false;
    //   }else if(this.tab == 2){
    //     this.stepSecond = true;
    //     this.stepFirst = false;
    //     this.stepThird=false;
    //     this.stepFour=false;
    //   }else if(this.tab == 3){
    //     this.stepThird = true;
    //     this.stepSecond = false;
    //     this.stepFirst = false;
    //     this.stepFour=false;
    //   }else{
    //     this.stepThird = false;
    //     this.stepSecond = false;
    //     this.stepFirst = false;
    //     this.stepFour = true;
    //   }

    // }
    // isSet (tabNum){
    //     return this.tab === tabNum;
    //   };
//this comment also for tab system

// for Property City option 
city=[
  {id: 1, name: "Noida"},
  {id: 2, name: "Ghaziabad"},
  {id: 3, name: "Greater Noida"},
  {id: 4, name: "New Delhi"},
  {id: 5, name: "Kolkata"}, 
];
//end for Property City option 

// for Property state option 
state=[
  {id: 0, name: "Utter Pradesh"},
  {id: 1, name: "Delhi"},
];
//end for Property state option 

//for Property status option 
status=[
  {id: 0, name: "Rent"},
  {id: 1, name: "Buy"}
]
//end for Property status option 

//for Property leasePeriod option 
leasePeriod=[
  {id: 0, name: "1 year"},
  {id: 1, name: "2 year"},
  {id: 2, name: "3 year"}  
]
//end for PropertyleasePeriodoption 


@ViewChild('fileInput') fileInput:any;
fileSelected(event:any){
// console.log(event)
this.selectedFile=event.target.files[0] ;
console.log(this.selectedFile)
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
          reader.onload = e => {
          this.imageSrc = reader.result;
          // console.log(" this.imageSrc", this.imageSrc)
          }
          reader.readAsDataURL(event.target.files[0]);
  }
}
propertySubmit(property){debugger
  if(property.propertyname==''&&property.propertyprice==''&&property.phone==''){
    alert("plz full fill necessary proprty");
    // location.reload();
    return false;
  }
  console.log("propertyyyyyyyyyyyyyy",property,this.selectedFile)
  property.user_id=this.user_id;
  var fd = new FormData();
  fd.append('myImage',this.selectedFile,);
  this.helImg.forEach((data)=>{
     console.log("dataaaaaaaaaaaaaaa",data);
    fd.append('myImage',data);
  })
  // fd.append('myImage',this.helImg);
  // fd.append("propertyname",property.propertyname);
  for (var key in property) {
        // console.log("++>",key,property[key]);
        fd.append(key,property[key]);         
  }
  console.log("propertyyyyyyyyyyyyyy44444",fd)

  this.authService.propertySubmit(fd)
    .subscribe((response:any) => {
      console.log("node login token data1",response);
      if(response.err== "somthing error to send"){
        alert("your property submit");
        location.reload();
       this.router.navigate(['property']) 
      }
      else{

      }
     
      // var obj=response.data; //dat take in obj for fetch
    })
}

// urls = new Array<string>();

  @ViewChild('fileInput') fileInputs:any;
  detectFiles(event) {
    let files = event.target.files;
    this.helImg.push(event.target.files[0]);
    this.totalImage=this.helImg.length
    // console.log("length",this.totalImage=this.helImg.length);
    // console.log("this.helImg",this.helImg)
    if (event.target.files && event.target.files[0]) { 
          for (let file of files) {
            // console.log("fileeeeeeeeeee",file)
            let reader = new FileReader();
            reader.onload = (e: any) => {
              this.urls.push(e.target.result);
              // console.log("hello get data urls", this.urls)
              // console.log("hello get data urls", this.urls)
            }
            reader.readAsDataURL(file);
          }
    }
  }
  // PhoneCheck(event) {
  //   const value=event.target.value;
  //   console.log("jejsdjjjs",value);
  //   var regex="^([6-9]){10}$";
  //   var text="Number should be 10 degits and Not Start From [0-5]";
  //   if(!(value.match(regex))){
  //     document.getElementById("phonevarify").innerHTML=text;
  //     return false;
  //   }
  //   else{
  //     document.getElementById("phonevarify").innerHTML="";
  //     this.property.phone=value;
  //     console.log("sddddddddddddddd", this.property.phone)
  //     return false;
  //   }
  // }
}

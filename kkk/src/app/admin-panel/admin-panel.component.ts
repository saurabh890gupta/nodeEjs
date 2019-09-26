import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service'
import{Router} from '@angular/router'
import { getLContext } from '@angular/core/src/render3/context_discovery';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  isSet:any;
  userData:any;
  propertyData:any;
  contactData:any;
  addressData:any;
  optionData:boolean=true
  viewoption:boolean=false;
  showInd:any;
  IsVisible=false;
  userConfig:any;
  contactConfig:any;
  propertyConfig:any;
  billingConfig:any;
  billingData:any;
  copyuserdata={
    _id:'',
    user_name:'',
    email:'',
    account_status:'',
    address:'',
  }
 
  copyPropertydata={
    _id:'',
    propertyname:'',
    propertyprice:'',
    propertystatus:'',
    propertycity:'',
    propertystate:'',
    propertyarea:'',
    phone:'',
    propertydescreption:''
  }
  copycontactData={
    _id:'',
    name:'',
    email:'',
    contact:'',
    address:'',
    query:''
  }
  copybillingData={
    address:'',
    city: '',
    country: '',
    firstName: '',
    lastName: '',
    mobile: '',
    paymentMode: '',
    postcode: '',
    state: '',
    termCondition: '',
    user_id: '', 
    _id:''
  }
  constructor(public authService:AuthServiceService,public router:Router) { }

  ngOnInit() {

    


    this.allData()
    this.isSet=sessionStorage.getItem('isSet')
    if(this.isSet==undefined){
      this.isSet=1
    }

    // this.isSet=1;
    if(sessionStorage.getItem('admintoken')==null){
      this.router.navigate(['/admin']);
    }
   
  }
  logOut(){
    sessionStorage.clear();
    location.reload();
      setTimeout(function()
      { 
        this.router.navigate(['/admin']);
      }, 100);
   
    
  
  }
  user(tab){
    // sessionStorage.clear();
    console.log("gel",tab)
    this.isSet=tab;
    sessionStorage.setItem("isSet",this.isSet);
    console.log(" this.isSet", this.isSet)

  }
  tempUserdata=[]
  tempPropertyData=[]
  tempContactData=[]
  tempBillingData=[]
  allData(){
      this.authService.alldata().subscribe((data:any)=>{
        if(data){
          console.log("all daata find",data)
          this.contactData=data.contactus;
          this.billingData=data.billingData;
          this.tempBillingData=this.billingData;
          this.userData=data.user;
          this.tempUserdata=this.userData;
          this.propertyData =data.property;
          this.tempPropertyData=this.propertyData;
          console.log("this.contactDatazzzzzzzzzzzzz",this.copyuserdata);
          this.tempContactData=this.contactData
          console.log("this.contactData",this.billingData, this.tempBillingData, this.contactData , this.userData,this.propertyData, );
         
          this.userConfig = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.userData.count,
           
          };
          this.propertyConfig = {
            itemsPerPage: 5,
            currentPage: 1,
           totalItems: this.propertyData.count, 
          }
          this.contactConfig = {
            itemsPerPage: 5,
            currentPage: 1,
           totalItems: this.contactData.count, 
          }
          this.billingConfig = {
            itemsPerPage: 5,
            currentPage: 1,
           totalItems: this.billingData.count, 
          }
        }else{
          console.log("all daata not find",)
        }
        
      
      })
      
  }
//this is for first user tab
  rowIndex:any
  roweditId:any;
  edit(i,userid){
    console.log("any gzb",i)
    this.rowIndex=i
    this.roweditId=userid;
    this.optionData=false;
  }
  save(ind,userdata){
    this.rowIndex="46545646";
    this.optionData=true;
    console.log("ind userdata",ind,userdata);
    if(userdata){
      this.authService.updateUserData(userdata).subscribe((data:any)=>{
        if(data.message=="update successfully"
        ){
          console.log("data find",data)
           alert("user data update");
        }else{

        }
      })
    }else{

    }
    
  }
  
  view(ind){debugger
  console.log("helolo fsdadasd",ind)
    this.showInd=ind
    console.log(this.showInd);
    this.copyuserdata._id=this.userData[this.showInd]._id
    this.copyuserdata.user_name=this.userData[this.showInd].user_name
    // this.viewoption = this.viewoption ? false : true;
    this.copyuserdata.email=this.userData[this.showInd].email
    this.copyuserdata.account_status=this.userData[this.showInd].account_status
    this.copyuserdata.address =this.userData[this.showInd].address
    
  }
  deleteData(id,ind){
   this.authService.deleteUserdata(id,ind).subscribe((res:any)=>{
    console.log("data find daTA gert ",res)
     if(res.message=="data delete successfull"){
       alert("user data delete succfully");
        location.reload();    
     }else{
      alert("user data not delete");
     }

   })
  }
  searchEnter(event){
   const value=event.target.value;
      console.log("valueeee",value);
      this.IsVisible=false;
      if(value==undefined){
        this.allData()
        return
      }
      if(value==''){
        this.allData()
      }
      if (value.length>=1) { 
        this.userData= this.tempUserdata.filter(f=>{
          console.log("hhhhhh",f.user_name)
          if(f && f.user_name.toLowerCase().indexOf(value.toLowerCase())>-1 || f.email.toLowerCase().indexOf(value.toLowerCase())>-1){
          // if(f && f.propertyname.indexOf(value)>-1 || f.propertycity.indexOf(value)>-1){  //WITH OUT UPPER CASE
          console.log("ffffffffffff",f)  
          return f;
          }
        })
        if(this.userData.length==0){
          this.IsVisible=true;
         }
      }
      else{
        this.userData=[];
      }
  
  }
  //end this is for first user tab


  //start this is for second proprtytab tab

  proprtyEdit(i,userid){
    console.log("any gzb",i)
    this.rowIndex=i
    this.roweditId=userid;
    this.optionData=false;
  }
  proprtySave(ind,propertydata){
    this.rowIndex="46545646";
    this.optionData=true;
    console.log("hello data get",propertydata._id)
    const propertyUpdate={
      propertyId:propertydata._id,
      propertyname:propertydata.propertyname,
      propertycity:propertydata.propertycity,
      propertyprice:propertydata.propertyprice,
      propertystatus:propertydata.propertystatus,
      propertyarea:propertydata.propertyarea,
    }
    console.log("propertydata cccccccccccc",propertyUpdate)
    
    console.log("ind userdata",ind,propertyUpdate);
    if(propertyUpdate){
      this.authService.updatePropertyData(propertyUpdate).subscribe((data:any)=>{
        if(data.message=="update successfully"
        ){
          console.log("data find",data)
           alert("user data update");
        }else{

        }
      })
    }else{

    }
    
  }
  propertyView(ind){debugger
    console.log("helolo fsdadasd",ind)
      this.showInd=ind
      console.log(this.showInd);
      this.copyPropertydata._id=this.propertyData[this.showInd]._id
      this.copyPropertydata.propertyname=this.propertyData[this.showInd].propertyname
      // this.viewoption = this.viewoption ? false : true;
      this.copyPropertydata.propertyprice=this.propertyData[this.showInd].propertyprice
      this.copyPropertydata.propertystatus=this.propertyData[this.showInd].propertystatus
      this.copyPropertydata.propertycity =this.propertyData[this.showInd].propertycity
      this.copyPropertydata.propertystate=this.propertyData[this.showInd].propertystate
      this.copyPropertydata.propertyarea=this.propertyData[this.showInd].propertyarea
      this.copyPropertydata.phone=this.propertyData[this.showInd].phone;
      this.copyPropertydata.propertydescreption=this.propertyData[this.showInd].propertydescreption
    }
    propertyDeleteData(id,ind){
      this.authService.deletePropertydata(id,ind).subscribe((res:any)=>{
       console.log("data find daTA gert ",res)
        if(res.message=="data delete successfull"){
          alert("user data delete succfully");
           location.reload();    
        }else{
         alert("user data not delete");
        }
   
      })
     }
 
     searchEnterProperty(event){
      const value=event.target.value;
         console.log("valueeee",value);
         this.IsVisible=false;
         if(value==undefined){
           this.allData()
           return
         }
         if(value==''){
           this.allData()
         }
         if (value.length>=1) { 
           this.propertyData= this.tempPropertyData.filter(f=>{
             console.log("hhhhhh",f.propertyname)
             if(f && f.propertyname.toLowerCase().indexOf(value.toLowerCase())>-1 || f.propertycity.toLowerCase().indexOf(value.toLowerCase())>-1){
             // if(f && f.propertyname.indexOf(value)>-1 || f.propertycity.indexOf(value)>-1){  //WITH OUT UPPER CASE
             console.log("ffffffffffff",f)  
             return f;
             }
           })
           if(this.propertyData.length==0){
             this.IsVisible=true;
            }
         }
         else{
           this.propertyData=[];
         }
     
     }
 //end this is for second proprtytab tab

 //start this is for third contacttab tab
     contactEdit(i,userid){
      console.log("any gzb",i)
      this.rowIndex=i
      this.roweditId=userid;
      this.optionData=false;
    }
    contactSave(ind,contactdata){
      this.rowIndex="46545646";
      this.optionData=true;
      console.log("hello data get",contactdata)
      // const propertyUpdate={
      //   propertyId:contactdata._id,
      //   propertyname:contactdata.propertyname,
      //   propertycity:contactdata.propertycity,
      //   propertyprice:contactdata.propertyprice,
      //   propertystatus:contactdata.propertystatus,
      //   propertyarea:contactdata.propertyarea,
      // }
      console.log("propertydata cccccccccccc",contactdata)
      
      console.log("ind userdata",ind,contactdata);
      if(contactdata){
        this.authService.updateContactData(contactdata).subscribe((data:any)=>{
          if(data.message=="update successfully"
          ){
            console.log("data find",data)
             alert("user data update");
          }else{
  
          }
        })
      }else{
  
      }
      
    }
    
    contactView(ind){debugger
      console.log("helolo fsdadasd",ind,this.contactData[0]._id)
        this.showInd=ind
        console.log(this.showInd);
        this.copycontactData._id=this.contactData[this.showInd]._id;
        this.copycontactData.name=this.contactData[this.showInd].name
        // this.viewoption = this.viewoption ? false : true;
        this.copycontactData.email=this.contactData[this.showInd].email
        this.copycontactData.contact=this.contactData[this.showInd].contact
        this.copycontactData.address =this.contactData[this.showInd].address
        this.copycontactData.query=this.contactData[this.showInd].query
        
      }
      contactDeleteData(id,ind){
        console.log("hello get data define",id)
        this.authService.deleteContactdata(id,ind).subscribe((res:any)=>{
         console.log("data find daTA gert ",res)
          if(res.message=="data delete successfull"){
            alert("user data delete succfully");
             location.reload();    
          }else{
           alert("user data not delete");
          }
     
        })
       }
   
       searchEnterContact(event){
        const value=event.target.value;
           console.log("valueeee",value);
           this.IsVisible=false;
           if(value==undefined){
             this.allData()
             return
           }
           if(value==''){
             this.allData()
           }
           if (value.length>=1) { 
             this.contactData= this.tempContactData.filter(f=>{
          
               if(f && f.name.toLowerCase().indexOf(value.toLowerCase())>-1 || f.email.toLowerCase().indexOf(value.toLowerCase())>-1){
               // if(f && f.propertyname.indexOf(value)>-1 || f.propertycity.indexOf(value)>-1){  //WITH OUT UPPER CASE
               console.log("ffffffffffff",f)  
               return f;
               }
             })
             if(this.contactData.length==0){
               this.IsVisible=true;
              }
           }
           else{
             this.contactData=[];
           }
       
       }
//end this is for third contacttab tab


//start this is for four billingtab tab

billingEdit(inde,userid){
  console.log("any gzb",inde)
  this.rowIndexbilling=inde
  this.roweditId=userid;
  this.optionData=false;
}
rowIndexbilling
billingSave(inde,billingdata){
  this.rowIndexbilling="46545646";
  this.optionData=true;
  console.log("hello data get",billingdata)
  // const propertyUpdate={
  //   propertyId:contactdata._id,
  //   propertyname:contactdata.propertyname,
  //   propertycity:contactdata.propertycity,
  //   propertyprice:contactdata.propertyprice,
  //   propertystatus:contactdata.propertystatus,
  //   propertyarea:contactdata.propertyarea,
  // }
  console.log("propertydata cccccccccccc",billingdata)
  
  console.log("ind userdata",inde,billingdata);
  if(billingdata){
    this.authService.updateBillingData(billingdata).subscribe((data:any)=>{
      if(data.message=="update successfully"
      ){
        console.log("data find",data)
         alert("user data update");
      }else{

      }
    })
  }else{

  }
  
}


billingView(inde){debugger
  console.log("helolo fsdadasd",inde,this.contactData[0]._id)
    this.showInd=inde
    console.log(this.showInd);
    this.copybillingData._id=this.billingData[this.showInd]._id;
    this.copybillingData.firstName=this.billingData[this.showInd].firstName;
    this.copybillingData.lastName=this.billingData[this.showInd].lastName;
    this.copybillingData.mobile=this.billingData[this.showInd].mobile;
    this.copybillingData.address =this.billingData[this.showInd].address;
    this.copybillingData.paymentMode=this.billingData[this.showInd].paymentMode;
    this.copybillingData.state=this.billingData[this.showInd].state;
    this.copybillingData.postcode =this.billingData[this.showInd].postcode;
    this.copybillingData.country=this.billingData[this.showInd].country;
    this.copybillingData.city=this.billingData[this.showInd].city;
    this.copybillingData.user_id=this.billingData[this.showInd].user_id;
    
  }
  billingDeleteData(id,inde){
    console.log("hello get data define",id)
    this.authService.deleteBillingdata(id,inde).subscribe((res:any)=>{
     console.log("data find daTA gert ",res)
      if(res.message=="data delete successfull"){
        alert("user data delete succfully");
         location.reload();    
      }else{
       alert("user data not delete");
      }
 
    })
   }

   searchEnterBilling(event){
    const value=event.target.value;
       console.log("valueeee",value);
       this.IsVisible=false;
       if(value==undefined){
         this.allData()
         return
       }
       if(value==''){
         this.allData()
       }
       if (value.length>=1) { 
         this.billingData= this.tempBillingData.filter(f=>{
      
           if(f && f.firstName.toLowerCase().indexOf(value.toLowerCase())>-1 || f.city.toLowerCase().indexOf(value.toLowerCase())>-1){
           // if(f && f.propertyname.indexOf(value)>-1 || f.propertycity.indexOf(value)>-1){  //WITH OUT UPPER CASE
           console.log("ffffffffffff",f)  
           return f;
           }
         })
         if(this.billingData.length==0){
           this.IsVisible=true;
          }
       }
       else{
         this.billingData=[];
       }
   
   }
//end this is for third contacttab tab
 

//start this is for pagination chang function
        
        pageChanged(event){
          this.userConfig.currentPage = event;
        }
        pageChanged1(event){
          this.propertyConfig.currentPage = event;
        }
        pageChanged2(event){
          this.contactConfig.currentPage = event;
        }
        pageChanged3(event){
          this.billingConfig.currentPage = event;
        }




//end this is for pagination chang function
    
 
  

// data=[1,2,3,4,5,6,7];
//   pageSizeSelector = [10,25,50,100];
//         currentPage = 1;
//         pageSize = 10;
//         numPages:any;
//         maxIndex:any
//         startIndex:any
//         paging(){
//                 this.$watch('numPages', function(value) {
//                 console.log(value);
//         this.numPages = Math.ceil(this.data.length/this.pageSize);
//         alert(this.pageSize);
//         pages = [];
//         this.maxIndex = this.currentPage * this.pageSize;
//         this.startIndex = this.maxIndex - this.pageSize;
//                     for (var i = 1; i <= value; i++) {
//                         this.pages.push(i);
//                     }
//                     //alert($scope.currentPage )
//                     if (this.currentPage > value) {
//                         this.selectPage(value);
//                     }
//                 });
//                 isActive(page) {
//                     return this.currentPage === page;
//                 };
//               selectPage(page) {
//                     if (!this.isActive(page)) {
//                         this.currentPage = page;
//                         //scope.onSelectPage(page);
//                     }
//                 };
//                 selectPrevious() {
//                     if (!this.noPrevious()) {
//                         this.selectPage(this.currentPage - 1);
//                     }
//                 };
//                 selectNext() {
//                     if (!this.noNext()) {
//                       this.selectPage(this.currentPage + 1);
//                     }
//                 };
//                 noPrevious() {
//                     return this.currentPage == 1;
//                 };
//                noNext() {
//                     return this.currentPage == this.numPages;
//                 };

//             }
//             this.paging();
   
}

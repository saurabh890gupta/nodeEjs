import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../config';
import { Router } from '@angular/router';
// import {AuthTokenService} from '../services/auth-token.service'
// import { config } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization': `Bearer ${sessionStorage.getItem('token')}`
    // 'authorization':'bearer ' + sessionStorage.getItem('token')
  })
};
// const httpOption = {
//   headers: new HttpHeaders({
//     // 'enctype': 'multipart/form-data',

//     'Content-Type': 'multipart/form-data',
//     // 'Accept': 'application/json',
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private config:Config,
    private router: Router,
    // private service1: AuthTokenService
    ){
      // this.service1.intercept;
      // console.log('after service 1 function',  this.service1.intercept);
      
     }
    
    signupSubmit(obj){
        const URL = this.config.url + 'signup';
        return this.http.post(URL, obj, httpOptions);
    }

    loginSubmit(formData){
      console.log("--->",formData)
      const URL = this.config.url + 'login';
      console.log("dkjskf",URL)
      return this.http.post(URL, formData,httpOptions);
    }
    logout(){
      const URL = this.config.url + 'logOut';
      return this.http.get(URL, httpOptions);
    }
    contactSubmit(obj){
      console.log("hello get contact")
      const URL=this.config.url + 'contactus';
      return this.http.post(URL,obj,httpOptions);
    }
    forgetEmail(obj){
      const URL=this.config.url+'forgetpassword';
      return this.http.post(URL,obj,httpOptions);
    }
    // propertyShow(){
    //   const URL=this.config.url+'PropertyDataSchema';
    //   return this.http.get(URL,httpOptions);
    // }
    ImageShow(){
      const URL=this.config.url+'Fileget';
      return this.http.get(URL,httpOptions);
    }
    propertySubmit(fd){
      
      console.log("lgkfjgkflgfhklg",fd)
      const URL=this.config.url+'Upload';
      return this.http.post(URL,fd);
    }
    // propertySubmit(formData){
    // //   console.log("dfjksdljfs",fileToUpload)
    // //   const formData: FormData = new FormData();
    // // formData.append('fileKey', fileToUpload, fileToUpload.name);
    // console.log("formData",formData)
    //   const URL=this.config.url+'Upload';
    //   return this.http.post(URL,httpOption);
    // }
    changPassword(obj){
      const URL=this.config.url+'changpassword?email='+obj.email+'';
      console.log(URL,"hell get data url");
      
      return this.http.post(URL,obj,httpOptions); 
    }
    getPropertydata(ind){
      console.log('proprty id',ind)
      const URL=this.config.url+'propertydetailsget?_id='+ind+'';
      console.log('URL sdfss',URL)
      return this.http.post(URL,httpOptions);
    }
    searchEmail(obj){
      console.log('proprty id',obj)
      const URL=this.config.url+'searchemail';
      console.log('URL sdfss',URL)
      return this.http.post(URL,obj,httpOptions)
    }
    submitCheckOut(checkOut,user_id){
      console.log("check out data find",checkOut);
      const URL=this.config.url +'billingAddress?user_id='+user_id+'';
      console.log('URL sdfss',URL)
      return this.http.post(URL,checkOut,httpOptions);
    }
    addressData(address_id){
      console.log("check addressData",address_id);
      const URL=this.config.url + 'getAddress?address_id='+address_id+'';
      console.log('URL sdfss',URL);
      return this.http.post(URL,httpOptions);
    }
    paymnetBuy(token){
      console.log("token data found",token)
      token={
        id:token
      }
      console.log("token data found",token)
      const URL=this.config.url + 'payme';
            console.log('URL sdfss',URL);
            return this.http.post(URL,token,httpOptions);
    }
    adminPanel(admin){
      console.log("adim data ",admin);

       const URL=this.config.url + 'admin';
            console.log('URL sdfss',URL);
            return this.http.post(URL,admin,httpOptions);

    }
    alldata(){
      const URL=this.config.url + 'exmple';
            console.log('URL sdfss',URL);
            return this.http.get(URL,httpOptions);
    }
    deleteUserdata(id,ind){
      console.log("hello get data ",id,ind)
      const URL=this.config.url + 'deleteUserData?user_id='+id+'';
      console.log('URL sdfss',URL);
      return this.http.post(URL,httpOptions);
    }
    updateUserData(userdata){
      console.log("adim data ",userdata);

       const URL=this.config.url + 'updateUserData';
            console.log('URL sdfss',URL);
            return this.http.post(URL,userdata,httpOptions);
    }
    updatePropertyData(propertydata){
      console.log("adim data ",propertydata);
      const URL=this.config.url + 'updatePropertyData';
      console.log('URL sdfss',URL);
      return this.http.post(URL,propertydata,httpOptions);
    }
    deletePropertydata(id,ind){
      console.log("hello get data ",id,ind)
      const URL=this.config.url + 'deletePropertyData?property_id='+id+'';
      console.log('URL sdfss',URL);
      return this.http.post(URL,httpOptions);
    }
    updateContactData(contactdata){
      console.log("adim data ",contactdata);
      const URL=this.config.url + 'updateContactData';
      console.log('URL sdfss',URL);
      return this.http.post(URL,contactdata,httpOptions);
    }
    deleteContactdata(id,ind){
      console.log("hello get data ",id,ind)
      const URL=this.config.url + 'deleteContactData?contact_id='+id+'';
      console.log('URL sdfss',URL);
      return this.http.post(URL,httpOptions);
    }
    updateBillingData(billingdata){
      console.log("billingdata billingdata data ",billingdata);
      const URL=this.config.url + 'updateBillingData';
      console.log('URL sdfss',URL);
      return this.http.post(URL,billingdata,httpOptions);
    }
    deleteBillingdata(id,ind){
      console.log("hello get data ",id,ind)
      const URL=this.config.url + 'deleteBillingData?billing_id='+id+'';
      console.log('URL sdfss',URL);
      return this.http.post(URL,httpOptions);
    }
    changPasswordOtp(email){
      console.log("hello get data ",email)
      const URL=this.config.url + 'changePasswordOtp?email='+email+'';
      console.log('URL sdfss',URL);
      return this.http.post(URL,httpOptions);
    }
    verifyOtpPssword(formdata){
      console.log("hello formdata ",formdata)
      const URL=this.config.url + 'verifyOtpPssword';
      console.log('URL sdfss',URL);
      return this.http.post(URL,formdata,httpOptions); 
    }
    paytmPayment(form){
      const URL = this.config.payment + 'paytm';
      console.log('URL sdfss',URL);
      return this.http.post(URL,form,httpOptions); 
    }
}

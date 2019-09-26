import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { parseTemplate } from '@angular/compiler';
import {AuthServiceService} from '../services/auth-service.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  sub:any;
  id:any;
  data:any;
  somthing:any;
  imgData=[];
  multiImageData=[];
  ownerDetails={
    propertyname:'',
    phone:'',
    propertycity:'',
    propertydescreption:'',
    propertyleaseperioud:'',
    propertyprice:'',
    propertystate:'',
    propertystatus:'',
    propertyarea:'',
    propertyCeilings: '',
    propertyDualsink: '',
    propertyJogpath: '',
    propertyStories:'',
    propertySwimmingpool: '',
    propertyVideo1:'',
    propertyVideo2:'',
    propertyVideo3:'',
    propertyexit: '',
    propertyimage: '',
    propertylaundryroom:'',
    propertyminbed: '',
    propertyrireplace: '',
   

  }
  safeSrc: SafeResourceUrl;
  constructor(
    public route:ActivatedRoute,
    public authService:AuthServiceService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
    // this.id = +params['ind']; // (+) converts string 'id' to a number
      console.log("held dtd",params.ind)
       this.propertyGetData(params.ind);
    });

    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/YRGc21Uo8sw");
  }
  // https://www.youtube.com/embed/0bAVd9jJE2Q
  propertyGetData(params){
    this.authService.getPropertydata(params).subscribe((response:any)=>{
      // console.log("hello data found",response)
      this.somthing=response.res
       console.log("respons555", response.res)
     
    //this is for multiple image
      response.res.forEach((multiImage)=>{
          console.log("data find according array",multiImage)
          multiImage.propertyShowImage.forEach((insideData)=>{
            this.multiImageData.push('http://localhost:5050/' + insideData)
          })
       })
      console.log("hello get all data",this.multiImageData)
    //this is for multiple image 

      response.res.forEach((data)=>{
        console.log("response response",data.propertyname)
        this.ownerDetails=data
        this.imgData.push('http://localhost:5050/' + data.propertyimage)
        
      })
     
      // console.log("data", this.imgData);
    })
  }
 
}

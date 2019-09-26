import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { MapsAPILoader, MouseEvent } from '@agm/core';
 
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  // zoom:number;
  isLoggedIn:any;
  address: string;
  // autocomplete:any;
  // private geoCoder;

  // @ViewChild('search')
  // public searchElementRef: ElementRef;
 
 
  
   
  constructor(private router:Router,
    // private mapsAPILoader: MapsAPILoader,
    // private ngZone: NgZone
  ) { }

  ngOnInit() {debugger
    
    this.isLoggedIn=localStorage.getItem('loggedIn');
    console.log(this.isLoggedIn,'isLoggedIn');
    //this use for back button after logout not redirect banner page
    if(sessionStorage.getItem('token')==null){
      this.router.navigate(['']);
    }
    // this.tokenVal = sessionStorage.getItem('token')
    // console.log(this.tokenVal,'token');
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
 
    //   this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["address"]
    //   });
    //   this.autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
 
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
 
    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });
  }

  city=[
    {id: 0, name: "Noida"},
    {id: 2, name: "Ghaziabad"},
    {id: 3, name: "Greater Noida"},
    {id: 4, name: "New Delhi"},
    {id: 5, name: "Kolkata"}, 
  ];
  status=[
    {id: 0, name: "Noida"},
    {id: 2, name: "Ghaziabad"},
    {id: 3, name: "Greater Noida"},
    {id: 4, name: "New Delhi"},
    {id: 5, name: "Kolkata"}, 
  ];

  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 8;
  //       this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }
  // markerDragEnd($event: MouseEvent) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }
 
  // getAddress(latitude, longitude) {
  //   this...geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     console.log(results);
  //     console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         // window.alert('No results found');
  //       }
  //     } else {
  //       // window.alert('Geocoder failed due to: ' + status);
  //     }
 
  //   });
  // }

}

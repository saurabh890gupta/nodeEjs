import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.setItem('loggedIn','false');
  }
  city=[
    {id: 0, name: "Noida"},
    {id: 2, name: "Ghaziabad"},
    {id: 3, name: "Greater Noida"},
    {id: 4, name: "New Delhi"},
    {id: 5, name: "Kolkata"}, 
  ];
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public screenWidth: any;
  public screenHeight: any;
  sidebarVisible: boolean = false;
  constructor() {
  }

  ngOnInit() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
  }
}

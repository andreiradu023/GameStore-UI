import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onLogout() {

  }
}

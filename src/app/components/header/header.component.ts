import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn.subscribe(value => {
      this.isAuthenticated = value;
    });
    this.isAuthenticated = this.authService.isUserLoggedIn();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  isAdmin() {
    let roles = this.authService.getUserFromLocalCache().roles;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name.includes("ADMIN"))
        return true;
    }
    return false;
  }
}

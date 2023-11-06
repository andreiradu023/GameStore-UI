import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage = 'Invalid credentials';
  invalidLogin = false;
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.subscriptions.push(
      this.authService.handleAuthentication(email, password).subscribe(response => {
        console.log(response.headers);

        const token = response.headers.get('Authorization');

        this.authService.saveToken(token || "");
        if (response.body != null) {
          this.authService.addUserToLocalCache(response.body);
        }
        this.authService.isLoggedIn.next(true);
        this.router.navigate(['/']);
        this.invalidLogin = false;
        this.isLoading = false;
      }, errorMessage => {
        console.log('authentication error', errorMessage);
        this.invalidLogin = true;
        this.isLoading = false;
      })
    );
  }
}

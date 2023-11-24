import {Component} from '@angular/core';
import {User} from "../../models/user";
import {NgForm} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  errorMessage = 'Invalid credentials';
  invalidRegistration: boolean = false;
  isLoading: boolean = false;

  constructor(private userService: UserService,
              private router: Router) {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let user = new User();
    user.firstName = form.value.firstName;
    user.lastName = form.value.lastName;
    user.email = form.value.email;
    user.password = form.value.password;
    user.phone = form.value.phoneNumber;
    user.address = form.value.address;

    this.userService.registerUser(user).subscribe(() =>
      this.goToLogin()
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id!: string;
  user: User = new User();
  isAddMode!: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.userService.getUser(this.id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser() {
    this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log('inside create user', data);
        this.goToUserList();
      },
      (error) => console.log(error)
    );
  }

  updateUser() {
    this.userService.updateUser(this.user, this.id).subscribe(
      (data) => {
        console.log('inside update user', data);
        this.goToUserList();
      },
      (error) => console.log(error)
    );
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }
}
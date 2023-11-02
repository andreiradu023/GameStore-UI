import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users!: User[];
  refreshing = false;
  subscriptions: Subscription[] = [];
  message: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.users.subscribe((data) => {
        this.users = data;
      })
    );
    this.refreshUsers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  refreshUsers() {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getAllUsers().subscribe(
        (response) => {
          this.userService.users.next(response);
          console.log(response);
          this.users = response;
          this.refreshing = false;
          this.message = undefined;
        },
        (error) => {
          this.refreshing = false;
          console.log(error);
        }
      )
    );
  }

  onNewUser() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onViewDetails(id: number) {
    this.router.navigate([id], {relativeTo: this.route})
  }

  onEdit(id: number) {
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: number) {
    this.userService.deleteUser(id).subscribe(response => {
      console.log(response);
      this.message = `User ${id} has been deleted!`;
      this.refreshUsers();
    });
  }

}

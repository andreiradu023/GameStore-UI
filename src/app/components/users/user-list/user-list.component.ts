import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {BehaviorSubject, Subscription} from "rxjs";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../models/page";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  userPageSubject = new BehaviorSubject<Page<User>>(null);
  currentPageSubject = new BehaviorSubject<number>(1);
  keyword: string = "";
  pageSize: number = 5;
  refreshing = false;
  subscriptions: Subscription[] = [];
  userToDelete: User;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getAllUsersByPage(1, this.pageSize, "id", "asc", this.keyword).subscribe(page => {
        this.userPageSubject.next(page);
        this.currentPageSubject.next(1)
      })
    )
    this.refreshUsers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  refreshUsers() {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getAllUsersByPage(this.currentPageSubject.value, this.pageSize, "id", "asc", this.keyword).subscribe(page => {
        this.userPageSubject.next(page);
        this.refreshing = false;
      }, error => {
        this.refreshing = false;
        console.error(error);
      })
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
    this.userService.deleteUser(id).subscribe(() => {
      this.refreshUsers();
    });
  }

  goToPage(keyword?: string, pageNumber: number = 1,) {
    this.userService.getAllUsersByPage(pageNumber, this.pageSize, "id", "asc", keyword).subscribe(data => {
      this.userPageSubject.next(data);
      this.currentPageSubject.next(pageNumber);
    });
  }

  goToNextOrPreviousPage(direction?: string, keyword?: string) {
    this.goToPage(keyword, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  }

  onSelected(pageSize: string) {
    this.pageSize = parseInt(pageSize);
    this.refreshUsers();
  }

  onSearch(keyword: string) {
    this.keyword = keyword;
    this.goToPage(keyword);
  }
}

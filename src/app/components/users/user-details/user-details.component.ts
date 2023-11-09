import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user!: User;
  id!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    this.userService.getUser(this.id).subscribe(response => {
      this.user = response;
    });
  }

  goToUserList() {
    this.router.navigate(['admin/users']);
  }
}

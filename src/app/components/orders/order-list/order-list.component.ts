import { Component } from '@angular/core';
import {Order} from "../../../models/order";
import {Subscription} from "rxjs";
import {OrderService} from "../../../service/order.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders!: Order[];
  refreshing = false;
  subscriptions: Subscription[] = [];
  message: string | undefined;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.orderService.orders.subscribe((data) => {
        this.orders = data;
      })
    );
    this.refreshOrders();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  refreshOrders() {
    this.refreshing = true;
    this.subscriptions.push(
      this.orderService.getAllOrders().subscribe(
        (response) => {
          this.orderService.orders.next(response);
          console.log(response);
          this.orders = response;
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

  onNewOrder() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onViewDetails(id: number) {
    this.router.navigate([id], {relativeTo: this.route})
  }

  onEdit(id: number) {
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: number) {
    this.orderService.deleteOrders(id).subscribe(response => {
      console.log(response);
      this.message = `Order ${id} has been deleted!`;
      this.refreshOrders();
    });
  }
}

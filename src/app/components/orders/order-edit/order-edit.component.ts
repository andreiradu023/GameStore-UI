import {Component, OnInit} from '@angular/core';
import {Order} from "../../../models/order";
import {OrderService} from "../../../service/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  id!: string;
  order: Order = new Order();
  isAddMode!: boolean;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.orderService.getOrders(this.id).subscribe((data) => {
        this.order = data;
      });
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createOrder();
    } else {
      this.updateOrder();
    }
  }

  createOrder() {
    this.orderService.createOrders(this.order).subscribe(
      (data) => {
        console.log('inside create order', data);
        this.goToOrderList();
      },
      (error) => console.log(error)
    );
  }

  updateOrder() {
    this.orderService.updateOrders(this.order, this.id).subscribe(
      (data) => {
        console.log('inside update order', data);
        this.goToOrderList();
      },
      (error) => console.log(error)
    );
  }

  goToOrderList() {
    this.router.navigate(['/orders']);
  }
}

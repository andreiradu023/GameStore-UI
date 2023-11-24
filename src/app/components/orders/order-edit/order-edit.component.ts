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

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.orderService.getOrders(this.id).subscribe((data) => {
      this.order = data;
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.updateOrder();
  }

  updateOrder() {
    this.orderService.updateOrders(this.order, this.id).subscribe(
      () => {
        this.goToOrderList();
      },
      (error) => console.error(error)
    );
  }

  goToOrderList() {
    this.router.navigate(['admin/orders']);
  }
}

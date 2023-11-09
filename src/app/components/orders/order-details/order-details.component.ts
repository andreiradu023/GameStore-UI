import {Component, OnInit} from '@angular/core';
import {Order} from "../../../models/order";
import {OrderService} from "../../../service/order.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order = new Order();
  id!: string;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    this.orderService.getOrders(this.id).subscribe(response => {
      this.order = response;
      console.log(response)
    });
  }

  goToOrderList() {
    this.router.navigate(['admin/orders']);
  }
}

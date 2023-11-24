import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from "../../../models/order";
import {BehaviorSubject, Subscription} from "rxjs";
import {OrderService} from "../../../service/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../models/page";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orderPageSubject = new BehaviorSubject<Page<Order>>(null);
  currentPageSubject = new BehaviorSubject<number>(1);
  keyword: string = "";
  pageSize: number = 5;
  refreshing = false;
  subscriptions: Subscription[] = [];
  orderToDelete: Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.orderService.getAllOrdersByPage(1, this.pageSize, "id", "asc", this.keyword).subscribe(page => {
        this.orderPageSubject.next(page);
        this.currentPageSubject.next(1)
      })
    )
    this.refreshOrders();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  refreshOrders() {
    this.refreshing = true;
    this.subscriptions.push(
      this.orderService.getAllOrdersByPage(this.currentPageSubject.value, this.pageSize, "id", "asc", this.keyword).subscribe(page => {
        this.orderPageSubject.next(page);
        this.refreshing = false;
      }, error => {
        this.refreshing = false;
        console.error(error);
      })
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
    this.orderService.deleteOrders(id).subscribe(() => {
      this.refreshOrders();
    });
  }

  goToPage(keyword?: string, pageNumber: number = 1,) {
    this.orderService.getAllOrdersByPage(pageNumber, this.pageSize, "id", "asc", keyword).subscribe(data => {
      this.orderPageSubject.next(data);
      this.currentPageSubject.next(pageNumber);
    });
  }

  goToNextOrPreviousPage(direction?: string, keyword?: string) {
    this.goToPage(keyword, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  }

  onSelected(pageSize: string) {
    this.pageSize = parseInt(pageSize);
    this.refreshOrders();
  }

  onSearch(keyword: string) {
    this.keyword = keyword;
    this.goToPage(keyword);
  }
}

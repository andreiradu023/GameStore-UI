import {Injectable} from '@angular/core';
import {Order} from "../models/order";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../../app.constants";
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getAllOrders() {
    return this.http.get<Order[]>(`${API_URL}/orders`);
  }

  getAllOrdersByPage(page: number, pageSize: number, sortField: string, sortDir: string, keyword: string) {
    let params = new HttpParams({
      fromObject: {
        pageSize,
        sortField,
        sortDir,
        keyword
      },
    });

    return this.http.get<Page<Order>>(`${API_URL}/orders/page/${page}`, {params});
  }

  getOrders(id: string) {
    return this.http.get<Order>(`${API_URL}/orders/${id}`);
  }

  createOrders(order: Order) {
    return this.http.post<Order>(`${API_URL}/orders`, order);
  }

  updateOrders(order: Order, id: string) {
    return this.http.put<Order>(`${API_URL}/orders/${id}`, order);
  }

  deleteOrders(id: number) {
    return this.http.delete<void>(`${API_URL}/orders/${id}`);
  }

}

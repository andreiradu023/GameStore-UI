import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order} from "../models/order";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient) {
  }

  getAllOrders() {
    return this.http.get<Order[]>(`${API_URL}/orders`);
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

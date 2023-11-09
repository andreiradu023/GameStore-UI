import {Injectable} from "@angular/core";
import {API_URL} from "../../app.constants";
import {HttpClient} from "@angular/common/http";
import {Cart} from "../models/cart";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) {
  }

  addGameToCart(gameId: number, quantity: number) {
    return this.http.post(`${API_URL}/cart/add/${gameId}/${quantity}`, null);
  }

  getCartItems() {
    return this.http.get<Cart[]>(`${API_URL}/cart`);
  }

  placeOrder() {
    return this.http.post(`${API_URL}/checkout`, null);
  }
}

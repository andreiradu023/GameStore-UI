import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {Cart} from "../../models/cart";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart!: Cart[];

  constructor(
    private shoppingCart: ShoppingCartService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.shoppingCart.getCartItems().subscribe(
      res => {
        console.log(res)
        this.cart = res
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnDestroy(): void {
    //subscription
  }


  calculateTotal() {
    let total = 0;
    this.cart.forEach((item) =>
      total += item.subtotal)
    return total.toFixed(2);
  }

  placeOrder() {
    this.shoppingCart.placeOrder().subscribe(res => {
      this.router.navigate(['checkout'])
    }, error => {
      console.error(error);
    })
  }
}

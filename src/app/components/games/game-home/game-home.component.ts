import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {Subscription} from "rxjs";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute} from "@angular/router";
import {ShoppingCartService} from "../../../service/shopping-cart.service";

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.css']
})
export class GameHomeComponent implements OnInit, OnDestroy {
  games!: Game[];
  subscriptions: Subscription[] = [];


  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listGames();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  listGames() {
    this.subscriptions.push(
      this.gameService.getAllGames().subscribe(
        data => {
          console.log(data);
          this.games = data;
        }, error => {
          console.log(this.games)
          console.log(error);
        }
      )
    );
  }

  validateQuantity(inputElement: HTMLInputElement) {
    if (parseInt(inputElement.value) < 0) {
      inputElement.value = '1';
    }
    if (parseInt(inputElement.value) > 15) {
      inputElement.value = '15';
    }
  }

  addGameToCart(id: number, quantity: string) {
    this.shoppingCartService.addGameToCart(id, parseInt(quantity)).subscribe(
      res => {
        alert('Game added successfully')
      },
      error => {
        alert(`Error: ${error.error.message}`)
      }
    );
  }
}

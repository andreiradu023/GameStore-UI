import {Component, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ShoppingCartService} from "../../../service/shopping-cart.service";

@Component({
  selector: 'app-game-info',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  game: Game = new Game();
  defaultImageUrl: string = 'https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg';
  id!: string;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    this.gameService.getGames(this.id).subscribe(response => {
      this.game = response;
    });
  }

  addGameToCart(id: number, quantity: number) {
    this.shoppingCartService.addGameToCart(id, quantity).subscribe(
      res => {
        alert('Game added successfully')
      },
      error => {
        alert(`Error: ${error.error.message}`)
      }
    );
  }
}

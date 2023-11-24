import {Component, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
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
    private router: Router,
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

  addGameToCart(id: number, quantity: string) {
    this.shoppingCartService.addGameToCart(id, parseInt(quantity)).subscribe(
      () => {
        alert(this.game.title + ' x' + quantity + ' added successfully')
      },
      error => {
        alert(`Error: ${error.error.message}`)
      }
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

  goToGamePage() {
    this.router.navigate(['games'])
  }
}

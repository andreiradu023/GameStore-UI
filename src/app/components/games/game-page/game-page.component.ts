import {Component, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-game-info',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  game: Game = new Game();
  id!: string;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    this.gameService.getGames(this.id).subscribe(response => {
      this.game = response;
    });
  }


}

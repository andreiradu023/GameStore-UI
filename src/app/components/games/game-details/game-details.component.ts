import {Component, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-games-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
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

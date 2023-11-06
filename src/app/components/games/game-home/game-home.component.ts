import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {Subscription} from "rxjs";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.css']
})
export class GameHomeComponent implements OnInit, OnDestroy{
  games!: Game[];
  subscriptions: Subscription[] = [];

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute) {
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
}

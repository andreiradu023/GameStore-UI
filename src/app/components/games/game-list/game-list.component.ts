import {Component, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {Subscription} from "rxjs";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games!: Game[];
  refreshing: boolean = false;
  subscription: Subscription[] = [];
  message: string | undefined;

  constructor(private gameService: GameService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription.push(
      this.gameService.gameList.subscribe(data => {
        this.games = data;
      })
    )
    this.refreshGames();
  }


  refreshGames() {
    this.refreshing = true;
    this.subscription.push(
      this.gameService.getAllGames().subscribe(
        response => {
          this.gameService.gameList.next(response);
          this.games = response;
          this.refreshing = false;
        }, error => {
          this.refreshing = false;
          console.log(error);
        }
      )
    );
  }

  onNewGame() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onViewDetails(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  onEdit(id: number) {
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: number) {
    this.gameService.deleteGames(id).subscribe(response => {
      console.log(response);
      this.message = `Game with id ${id} has been deleted!`;
      this.refreshGames();
    })
  }
}

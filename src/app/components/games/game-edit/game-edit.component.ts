import {Component, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  id!: string;
  game: Game = new Game();
  isAddMode!: boolean;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.gameService.getGames(this.id).subscribe((data) => {
        this.game = data;
      });
    }
  }

    onSubmit(form: NgForm) {
      if (form.invalid) {
        return;
      }
      if (this.isAddMode) {
        this.createGame();
      } else {
        this.updateGame();
      }
    }

  createGame() {
    this.gameService.createGames(this.game).subscribe(
      (data) => {
        console.log('inside create game', data);
        this.goToGameList();
      },
      (error) => console.log(error)
    );
  }

  updateGame() {
    this.gameService.updateGames(this.game, this.id).subscribe(
      (data) => {
        console.log('inside update game', data);
        this.goToGameList();
      },
      (error) => console.log(error)
    );
  }

  goToGameList() {
    this.router.navigate(['/games']);
  }

}

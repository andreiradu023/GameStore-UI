import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../../models/game";
import {BehaviorSubject, Subscription} from "rxjs";
import {GameService} from "../../../service/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../models/page";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {
  gamePageSubject = new BehaviorSubject<Page<Game>>(null);
  currentPageSubject = new BehaviorSubject<number>(1);
  keyword: string = "";
  pageSize: number = 5;
  refreshing: boolean = false;
  subscriptions: Subscription[] = [];
  message: string | undefined;
  gameToDelete: Game;

  constructor(private gameService: GameService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.gameService.getAllGamesByPage(1, this.pageSize, "id", "asc", this.keyword).subscribe(page => {
        this.gamePageSubject.next(page);
        this.currentPageSubject.next(1)
      })
    )
    this.refreshGames();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  refreshGames() {
    this.refreshing = true;
    this.subscriptions.push(
      this.gameService.getAllGamesByPage(this.currentPageSubject.value, this.pageSize, "id", "asc", this.keyword).subscribe(page => {
        this.gamePageSubject.next(page);
        this.refreshing = false;
      }, error => {
        this.refreshing = false;
        console.error(error);
      })
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
    this.gameService.deleteGames(id).subscribe(() => {
      this.message = `Game with id ${id} has been deleted!`;
      this.refreshGames();
    })
  }

  goToPage(keyword?: string, pageNumber: number = 1,) {
    this.gameService.getAllGamesByPage(pageNumber, this.pageSize, "id", "asc", keyword).subscribe(data => {
      this.gamePageSubject.next(data);
      this.currentPageSubject.next(pageNumber);
    });
  }

  goToNextOrPreviousPage(direction?: string, keyword?: string) {
    this.goToPage(keyword, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1)
  }

  onSelected(pageSize: string) {
    this.pageSize = parseInt(pageSize);
    this.refreshGames();
  }

  onSearch(keyword: string) {
    this.keyword = keyword;
    this.goToPage(keyword);
  }
}

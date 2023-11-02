import {APP_ID, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Game} from "../models/game";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";


@Injectable({
  providedIn: 'root'
})
export class GameService {
  games: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
  gameList: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

  constructor(private http: HttpClient) {
  }

  getAllGames() {
    return this.http.get<Game[]>(`${API_URL}/games`);
  }

  getGames(id: string) {
    return this.http.get<Game>(`${API_URL}/games/${id}`);
  }

  createGames(game: Game) {
    return this.http.post<Game>(`${API_URL}/games`, game);
  }

  updateGames(game: Game, id: string) {
    return this.http.put<Game>(`${API_URL}/games/${id}`, game);
  }

  deleteGames(id: number) {
    return this.http.delete<void>(`${API_URL}/games/${id}`);
  }
}

import {Injectable} from '@angular/core';
import {Game} from "../models/game";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../../app.constants";
import {Page} from "../models/page";


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getAllGames() {
    return this.http.get<Game[]>(`${API_URL}/games`);
  }

  getAllGamesByPage(page: number, pageSize: number, sortField: string, sortDir: string, keyword: string) {
    let params = new HttpParams({
      fromObject: {
        pageSize,
        sortField,
        sortDir,
        keyword
      },
    });

    return this.http.get<Page<Game>>(`${API_URL}/games/page/${page}`, {params});
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

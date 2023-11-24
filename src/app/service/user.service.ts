import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {User} from "../models/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_URL} from "../../app.constants";
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get<User[]>(`${API_URL}/users`).pipe(
      map((users) => {
        return users.map((user) => {
          return {...user, roles: user.roles ? user.roles : []};
        });
      })
    );
  }

  getAllUsersByPage(page: number, pageSize: number, sortField: string, sortDir: string, keyword: string) {
    let params = new HttpParams({
      fromObject: {
        pageSize,
        sortField,
        sortDir,
        keyword
      },
    });

    return this.http.get<Page<User>>(`${API_URL}/users/page/${page}`, {params});
  }

  getUser(id: string) {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }

  createUser(user: User) {
    return this.http.post<User>(`${API_URL}/users`, user);
  }

  updateUser(user: User, id: string) {
    return this.http.put<User>(`${API_URL}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<void>(`${API_URL}/users/${id}`);
  }

  registerUser(user: User) {
    return this.http.post<void>(`${API_URL}/register`, user);
  }
}

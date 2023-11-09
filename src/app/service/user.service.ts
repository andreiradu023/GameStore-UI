import {Injectable} from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>(`${API_URL}/users`).pipe(
      map((users) => {
        return users.map((user) => {
          return { ...user, roles: user.roles ? user.roles : [] };
        });
      })
    );
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
}

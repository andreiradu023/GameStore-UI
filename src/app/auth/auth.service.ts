import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {API_URL} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  handleAuthentication(email: string, password: string) {
    let user = {email: email, password: password};
    return this.http.post<User>(
      `${API_URL}/basic-auth`, user, {observe: 'response'});
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user') || "");
  }

  loadToken() {
    this.token = localStorage.getItem('token') || "";
  }

  getToken() {
    return this.token;
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  isUserLoggedIn() {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      // check decode == user && tokenNotExpired
      this.isLoggedIn.next(true);
      return true;
    } else {
      this.logout();
      return false;
    }
  }
}

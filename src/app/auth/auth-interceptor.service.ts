import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {API_URL} from "../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes(`${API_URL}/basic-auth`)) {
      return next.handle(req);
    }
    this.authService.loadToken();
    const token = this.authService.getToken();
    const request = req.clone({ setHeaders: { Authorization: token } });
    return next.handle(request);
  }

}

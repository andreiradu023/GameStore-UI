import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailsComponent } from './components/games/game-details/game-details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UsersComponent} from "./components/users/users.component";
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import {FormsModule} from "@angular/forms";
import { UserListComponent } from './components/users/user-list/user-list.component';
import { GameListComponent } from './components/games/game-list/game-list.component';
import { GameEditComponent } from './components/games/game-edit/game-edit.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { OrderEditComponent } from './components/orders/order-edit/order-edit.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { GamePageComponent } from './components/games/game-page/game-page.component';
import { GameHomeComponent } from './components/games/game-home/game-home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    GameDetailsComponent,
    UsersComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserListComponent,
    GameListComponent,
    GameEditComponent,
    OrdersComponent,
    OrderDetailsComponent,
    OrderEditComponent,
    OrderListComponent,
    GamePageComponent,
    GameHomeComponent,
    ShoppingCartComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

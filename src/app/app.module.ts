import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {GamesComponent} from './components/games/games.component';
import {GameDetailsComponent} from './components/games/game-details/game-details.component';
import {HttpClientModule} from "@angular/common/http";
import {UsersComponent} from "./components/users/users.component";
import {UserEditComponent} from './components/users/user-edit/user-edit.component';
import {UserDetailsComponent} from './components/users/user-details/user-details.component';
import {FormsModule} from "@angular/forms";
import {UserListComponent} from './components/users/user-list/user-list.component';
import {GameListComponent} from './components/games/game-list/game-list.component';
import {GameEditComponent} from './components/games/game-edit/game-edit.component';

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
    GameEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

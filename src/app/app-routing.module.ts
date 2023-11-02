import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {GamesComponent} from "./components/games/games.component";
import {GameListComponent} from "./components/games/game-list/game-list.component";
import {GameDetailsComponent} from "./components/games/game-details/game-details.component";
import {GameEditComponent} from "./components/games/game-edit/game-edit.component";
import {UsersComponent} from "./components/users/users.component";
import {UserListComponent} from "./components/users/user-list/user-list.component";
import {UserDetailsComponent} from "./components/users/user-details/user-details.component";
import {UserEditComponent} from "./components/users/user-edit/user-edit.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin/games', component: GamesComponent,
    children: [
      { path: '', component: GameListComponent},
      {path: 'new', component: GameEditComponent},
      {path: ':id', component: GameDetailsComponent},
      {path: 'edit/:id', component: GameEditComponent}
    ]
  },
  {path: 'admin/users', component: UsersComponent,
    children: [
      { path: '', component: UserListComponent},
      {path: 'new', component: UserEditComponent},
      {path: ':id', component: UserDetailsComponent},
      {path: 'edit/:id', component: UserEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

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
import {OrdersComponent} from "./components/orders/orders.component";
import {OrderListComponent} from "./components/orders/order-list/order-list.component";
import {OrderEditComponent} from "./components/orders/order-edit/order-edit.component";
import {OrderDetailsComponent} from "./components/orders/order-details/order-details.component";

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
  },
  {path:'admin/orders', component: OrdersComponent,
    children: [
      {path: '', component: OrderListComponent},
      {path: 'new', component: OrderEditComponent},
      {path: ':id', component: OrderDetailsComponent},
      {path: 'edit/:id', component: OrderEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

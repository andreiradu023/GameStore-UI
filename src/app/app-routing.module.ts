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
import {GameHomeComponent} from "./components/games/game-home/game-home.component";
import {GamePageComponent} from "./components/games/game-page/game-page.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {AuthGuard} from "./auth/auth.guard";
import {CheckoutComponent} from "./components/checkout/checkout.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'games', component: GameHomeComponent},
  {path: 'games/:id', component: GamePageComponent},
  {
    path: 'admin/games', component: GamesComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: GameListComponent},
      {path: 'new', component: GameEditComponent},
      {path: ':id', component: GameDetailsComponent},
      {path: 'edit/:id', component: GameEditComponent}
    ]
  },
  {
    path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: UserListComponent},
      {path: 'new', component: UserEditComponent},
      {path: ':id', component: UserDetailsComponent},
      {path: 'edit/:id', component: UserEditComponent}
    ]
  },
  {
    path: 'admin/orders', component: OrdersComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: OrderListComponent},
      {path: 'new', component: OrderEditComponent},
      {path: ':id', component: OrderDetailsComponent},
      {path: 'edit/:id', component: OrderEditComponent},
    ]
  },
  {path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

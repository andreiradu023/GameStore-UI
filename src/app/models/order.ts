import {User} from "./user";
import {Game} from "./game";

export class Order {
  id!: number;
  user!: User;
  orderDate!: Date;
  totalPrice!: number;
  orderItems!: OrderItems[];
}

export class OrderItems {
  game!: Game;
  quantity!: number;
  unitPrice!: number;
}

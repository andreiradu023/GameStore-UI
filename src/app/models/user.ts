export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  phone!: string;
  address!: string;
  roles!: Role[];
}

export class Role {
  name!: string;
}

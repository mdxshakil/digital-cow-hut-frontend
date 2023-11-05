export type ICow = {
  _id: string;
  name: string;
  age: number;
  image: string;
  price: number;
  location: string;
  breed: string;
  weight: number;
  label: string;
  category: string;
  seller: string | IUser;
};

export type IUserRole = "buyer" | "seller";

export type IUser = {
  _id: string;
  phoneNumber: string;
  role: IUserRole;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget?: number;
  income?: number;
};

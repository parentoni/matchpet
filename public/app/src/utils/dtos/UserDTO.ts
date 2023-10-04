export interface IUserPersistent {
  _id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  role: number;
  verified: boolean;
  phone_number: string;
}
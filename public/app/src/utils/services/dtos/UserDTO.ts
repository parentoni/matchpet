export interface IUserPersistent {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  verified: boolean;
  phone_number: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  in_adoption: number;
  completed_adoptions: number;
}

export interface IUserPersistent {
  _id: string;
  display_name:string;
  username:string;
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
  image?:string,
  description?:string,
}

export interface IUserSignIn {
  password:string,
  display_name:string,
  email:string,
  phone:string,
  location: [number, number],
  username: string
}
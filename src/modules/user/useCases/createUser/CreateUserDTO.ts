export interface CreateUserDTO {
  display_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  location: GeoJSON.Position;
  role?: number; //!Temporary,
  verified?: boolean; //!Temporary,
}

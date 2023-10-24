import { ICoordinatePersistent } from "../../../../shared/infra/database/models/Coordinate";

export interface CreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  location: ICoordinatePersistent;
  role?: number; //!Temporary,
  verified?: boolean; //!Temporary,

}

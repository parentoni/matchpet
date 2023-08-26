export interface CreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cpf?: string;
  role?: number; //!Temporary,
  verified?:boolean //!Temporary
}

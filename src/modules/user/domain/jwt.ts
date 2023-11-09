export interface JWTDTO {
  uid: string;
  email: string;
  display_namme: string;
  role: number;
  token_function: TokenFunctions;
  verified: boolean;
}

export enum TokenFunctions {
  authenticateUser = "AUTHENTICATE_USER"
}

export type JWTToken = string;

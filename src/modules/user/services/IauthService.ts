import { Either } from "../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../shared/core/Response/UseCaseError";
import { JWTToken, JWTDTO } from "../domain/jwt";

export interface IAuthService {
  signJWT(props: JWTDTO, expiresIn?:string): Promise<JWTToken>;
  decodeJWT(token: JWTToken): Promise<Either<CommonUseCaseResult.InvalidValue, JWTDTO>>;
}

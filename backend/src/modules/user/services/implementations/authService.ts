import { sign, verify } from "jsonwebtoken";
import { JWTDTO } from "../../domain/jwt";
import { IAuthService } from "../IauthService";
import { Either, left, right } from "../../../../shared/core/Result";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
export class AuthService implements IAuthService {
  protected key: string;

  constructor(key: string) {
    this.key = key;
  }

  //Returns a token that never expires
  public async signJWT(props: JWTDTO): Promise<string> {
    return sign(props, this.key);
  }

  public async decodeJWT(token: string): Promise<Either<CommonUseCaseResult.InvalidValue, JWTDTO>> {
    try {
      return right(verify(token, this.key) as JWTDTO);
    } catch (error) {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          errorMessage: "Invalid JWT token.",
          location: `${AuthService.name}.${this.decodeJWT.name}`,
          variable: "JWT_TOKEN"
        })
      );
    }
  }
}

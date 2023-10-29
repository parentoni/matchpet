import { UseCase } from "../../../../shared/core/UseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserResponse } from "./CreateUserResponse";
import { UserPassword } from "../../domain/userProps/userPassword";
import { left, right } from "../../../../shared/core/Result";
import { UserEmail } from "../../domain/userProps/userEmail";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { UserCpf } from "../../domain/userProps/userCpf";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repository/IUserRepo";
import { AppError } from "../../../../shared/core/Response/AppError";
import { RepositoryBaseResult } from "../../../../shared/core/IBaseRepositoty";
import { Iwatch } from "../../../../shared/core/Response/Error";
import { Guard } from "../../../../shared/core/Guard";
import { UserName } from "../../domain/userProps/userName";
import { IAuthService } from "../../services/IauthService";
import { UserRole } from "../../domain/userProps/userRole";
import { UserCreated } from "../../domain/events/userCreated";
import { UserPhone } from "../../domain/userProps/userPhone";
import { UserMap } from "../../mappers/userMap";
import { Location } from "../../../../shared/core/Location";
import { Secrets } from "../../../../config/secretsManager";

export class CreateUserUseCase implements UseCase<CreateUserDTO, CreateUserResponse> {
  private userRepo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.userRepo = repo;
  }

  async execute(request: CreateUserDTO): Promise<CreateUserResponse> {
    const nameOrError = UserName.create({
      first_name: request.first_name,
      last_name: request.last_name
    });
    const passwordOrError = UserPassword.create({ value: request.password });
    const emailOrError = UserEmail.create({ value: request.email });
    const roleOrError = UserRole.create({ value: request.role || 0 });
    const phoneOrError = UserPhone.create({ value: request.phone });
    const locationOrError = Location.GeoJsonPoint.create({ coordinates: request.location });

    const result = EitherUtils.combine([passwordOrError, emailOrError, phoneOrError, nameOrError, roleOrError, locationOrError]);

    if (result.isLeft()) {
      return left(result.value);
    }

    const password = passwordOrError.getRight();
    const email = emailOrError.getRight();
    const name = nameOrError.getRight();
    const role = roleOrError.getRight();
    const phone = phoneOrError.getRight();
    const location = locationOrError.getRight();

    const hashedPassword = UserPassword.create({
      value: await password.getHashedValue(),
      hashed: true
    });
    if (hashedPassword.isLeft()) {
      return left(hashedPassword.value);
    }
    const userOrError = User.create({
      name,
      email,
      password: hashedPassword.value,
      phone,
      role,
      verified: Secrets.NODE_ENV === "development" ? request.verified || false : false,
      location,
      inAdoption: 0,
      completedAdoptions: 0
      // role: UserRole.create({value: 0})
    });

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    try {
      // User Conflict checking
      let watchList: Iwatch<Awaited<RepositoryBaseResult<any>>>[] = [];

      const userWithEmail = await this.userRepo.exists({
        filter: { email: userOrError.value.email.value }
      });

      watchList.push({
        name: "EMAIL",
        watch: userWithEmail,
        error: `The email ${email.mask()} associated for this account already exists.`
      });

      for (const watched of watchList) {
        if (watched.watch.isRight()) {
          return left(
            CommonUseCaseResult.Conflict.create({
              errorMessage: watched.error,
              variable: watched.name,
              location: `${CreateUserUseCase.name}.${this.execute.name}`
            })
          );
        }
      }

      const user = userOrError.value;

      console.log(user);
      const persisantResponse = await this.userRepo.create({ dto: user });

      if (persisantResponse.isLeft()) {
        return left(persisantResponse.value);
      } else {
        const mapperResult = await UserMap.toPersistant(user);
        if (mapperResult.isLeft()) {
          return left(mapperResult.value);
        }

        return right(mapperResult.value);
      }
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}

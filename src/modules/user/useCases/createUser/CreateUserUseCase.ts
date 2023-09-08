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

    const result = EitherUtils.combine([passwordOrError, emailOrError, phoneOrError, nameOrError, roleOrError]);
    if (result.isLeft()) {
      return left(result.value);
    }

    const password = passwordOrError.getRight();
    const email = emailOrError.getRight();
    const name = nameOrError.getRight();
    const role = roleOrError.getRight();
    const phone = phoneOrError.getRight();

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
      verified: request.verified || false
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
      const persisantResponse = await this.userRepo.create({ dto: user });

      if (persisantResponse.isLeft()) {
        return left(persisantResponse.value);
      } else {
        return right(user);
      }
    } catch (error) {
      return left(AppError.UnexpectedError.create(error));
    }
  }
}

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

export class CreateUserUseCase implements UseCase<CreateUserDTO, CreateUserResponse> {
  private userRepo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.userRepo = repo;
  }

  async execute(request: CreateUserDTO): Promise<CreateUserResponse> {
    const passwordOrError = UserPassword.create({ value: request.password });
    const emailOrError = UserEmail.create({ value: request.email });
    const cpfOrError = UserCpf.create({ value: request?.cpf });
    const nameOrError = UserName.create({
      first_name: request.first_name,
      last_name: request.last_name
    });
    const roleOrError = UserRole.create({ value: request.role || 0 });

    const result = EitherUtils.combine([passwordOrError, emailOrError, cpfOrError, nameOrError, roleOrError]);
    if (result.isLeft()) {
      return left(CommonUseCaseResult.InvalidValue.create(result.value.error));
    }

    const password = passwordOrError.getRight() as UserPassword;
    const email = emailOrError.getRight() as UserEmail;
    const cpf = cpfOrError.getRight() as UserCpf;
    const name = nameOrError.getRight() as UserName;
    const role = roleOrError.getRight() as UserRole;

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
      cpf,
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

      if (cpfOrError.isRight()) {
        const cpfCheck = Guard.againstNullOrUndefined(cpf, "CPF");
        if (cpfCheck.isRight()) {
          const userWithCpf = await this.userRepo.exists({
            filter: { cpf: cpfOrError.value?.value }
          });
          watchList.push({
            name: "CPF",
            watch: userWithCpf,
            error: `The cpf ${cpf.mask()} associated for this account already exists.`
          });
        }
      }

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

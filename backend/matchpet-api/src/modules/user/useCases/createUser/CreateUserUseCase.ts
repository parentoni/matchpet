import { Secrets } from "../../../../config/secretsManager";
import { UseCase } from "../../../../shared/core/UseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserResponse } from "./CreateUserResponse";
import { UserPassword } from "../../domain/userProps/userPassword";
import { left, right } from "../../../../shared/core/Result";
import { UserEmail } from "../../domain/userProps/userEmail";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { EitherUtils } from "../../../../shared/utils/EitherUtils";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repository/IUserRepo";
import { Iwatch } from "../../../../shared/core/Response/Error";
import { UserDisplayName } from "../../domain/userProps/userDisplayName";
import { UserRole } from "../../domain/userProps/userRole";
import { UserPhone } from "../../domain/userProps/userPhone";
import { UserMap } from "../../mappers/userMap";
import { Location } from "../../../../shared/core/Location";
import { UserLastLogin } from "../../domain/userProps/userLastLogin";
import { UserName } from "../../domain/userProps/userName";
import { UserImage } from "../../domain/userProps/userImage";
import { UserDescription } from "../../domain/userProps/userDescription";
import { RepositoryBaseResult } from "../../repository/IUserRepo";
import { UniqueGlobalId } from "../../../../shared/domain/UniqueGlobalD";
export class CreateUserUseCase implements UseCase<CreateUserDTO, CreateUserResponse> {
  private userRepo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.userRepo = repo;
  }

  async execute(request: CreateUserDTO): Promise<CreateUserResponse> {
    const displayNameOrError = UserDisplayName.create({
      display_name: request.display_name
    });
    const passwordOrError = UserPassword.create({ value: request.password });
    const emailOrError = UserEmail.create({ value: request.email });
    const roleOrError = UserRole.create({ value: 0 });
    const phoneOrError = UserPhone.create({ value: request.phone });
    const locationOrError = Location.GeoJsonPoint.create({ coordinates: request.location });
    const lastLoginOrError = UserLastLogin.create({ date: new Date() });
    const userNameOrError = UserName.create({ username: request.username });
    const ibgeIdOrError = UniqueGlobalId.createExisting(request.ibgeId);

    let image: undefined | UserImage;

    if (request.image) {
      const imageOrError = UserImage.create({ image: request.image });
      if (imageOrError.isLeft()) {
        return left(imageOrError.value);
      }

      image = imageOrError.value;
    }

    let description: undefined | UserDescription;
    if (request.description) {
      const descriptionOrError = UserDescription.create({ value: request.description });
      if (descriptionOrError.isLeft()) {
        return left(descriptionOrError.value);
      }

      description = descriptionOrError.value;
    }

    const result = EitherUtils.combine([
      passwordOrError,
      emailOrError,
      phoneOrError,
      displayNameOrError,
      roleOrError,
      locationOrError,
      lastLoginOrError,
      userNameOrError,
      ibgeIdOrError
    ]);

    if (result.isLeft()) {
      return left(result.value);
    }

    const password = passwordOrError.getRight();
    const email = emailOrError.getRight();
    const displayName = displayNameOrError.getRight();
    const role = roleOrError.getRight();
    const phone = phoneOrError.getRight();
    const location = locationOrError.getRight();
    const lastLogin = lastLoginOrError.getRight();
    const username = userNameOrError.getRight();
    const hashedPassword = UserPassword.create({
      value: await password.getHashedValue(),
      hashed: true
    });
    const ibgeId = ibgeIdOrError.getRight();

    if (hashedPassword.isLeft()) {
      return left(hashedPassword.value);
    }

    try {
      // User Conflict checking
      let watchList: Iwatch<Awaited<RepositoryBaseResult<any>>>[] = [];

      const userWithEmail = await this.userRepo.exists({
        filter: { email: email.value }
      });

      const userWithUserName = await this.userRepo.exists({
        filter: { username: username.value }
      });

      watchList.push(
        {
          name: "USER_EMAIL",
          watch: userWithEmail,
          error: `The email ${email.mask()} associated for this account already exists.`,
          printableErrorMessage: `O email ${email.mask()} associado com essa conta já está sendo utilizado.`
        },
        {
          name: "USER_NAME",
          watch: userWithUserName,
          error: `The username ${username.value} associated for this account already exists.`,
          printableErrorMessage: `O nome de usuário "${username}" associado com essa conta já está sendo utilizado.`
        }
      );

      for (const watched of watchList) {
        if (watched.watch.isRight()) {
          return left(
            CommonUseCaseResult.Conflict.create({
              errorMessage: watched.error,
              variable: watched.name,
              location: `${CreateUserUseCase.name}.${this.execute.name}`,
              printableErrorMessage: watched.printableErrorMessage
            })
          );
        }
      }

      const userOrError = User.create({
        username,
        displayName,
        email,
        password: hashedPassword.value,
        phone,
        role,
        verified: Secrets.NODE_ENV == 'production'?false:true,
        location,
        inAdoption: 0,
        completedAdoptions: 0,
        lastLogin: lastLogin,
        image,
        description,
        ibgeId,
      });

      if (userOrError.isLeft()) {
        return left(userOrError.value);
      }

      const user = userOrError.value;

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

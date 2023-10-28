import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";
import { UserMap } from "../../mappers/userMap";
import { IUserRepo } from "../../repository/IUserRepo";
import { GetAllActiveOrganizationsResponse } from "./getAllActiveOrganizationsResponse";

export class GetAllActiveOrganizationsUseCase implements UseCase<void, GetAllActiveOrganizationsResponse> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: void): Promise<GetAllActiveOrganizationsResponse> {
    const response = await this.userRepo.getActiveUsers({});
    const persistentUsers: IUserPersistant[] = [];

    if (response.isLeft()) {
      return left(response.value);
    }

    for (const user of response.value) {
      const safeUser = await UserMap.toSafePersistent(user);
      if (safeUser.isLeft()) {
        return left(safeUser.value);
      }

      persistentUsers.push(safeUser.value);
    }

    return right(persistentUsers);
  }
}

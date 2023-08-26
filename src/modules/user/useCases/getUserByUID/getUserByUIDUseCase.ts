import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repository/IUserRepo";
import { GetUserByUIDDTO } from "./getUserByUIDDTO";
import { GetUserByUIDResponse } from "./getUserByUIDResponse";

export class GetUserByUIDUseCase implements UseCase<GetUserByUIDDTO, GetUserByUIDResponse> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: GetUserByUIDDTO): GetUserByUIDResponse {
    const check = Guard.againstNullOrUndefined(request, "USER_ID");
    if (check.isRight()) {
      const user = await this.userRepo.find_one({
        filter: { _id: request.uid }
      });
      if (user.isLeft()) {
        return left(user.value);
      }

      return right(user.value);
    } else {
      return left(check.value);
    }
  }
}

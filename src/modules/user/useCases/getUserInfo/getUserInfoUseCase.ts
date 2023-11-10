import { Guard } from "../../../../shared/core/Guard";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IUserRepo } from "../../repository/IUserRepo";
import { GetUserByUIDDTO } from "../getUserByUID/getUserByUIDDTO";
import { GetUserByUIDResponse } from "../getUserByUID/getUserByUIDResponse";
import { GetUserByUIDUseCase } from "../getUserByUID/getUserByUIDUseCase";
import { GetUserInfoDTO } from "./getUserInfoDTO";
import { GetUserInfoUseCaseResponse } from "./getUserInfoResponse";

export class GetUserInfoUseCase implements UseCase<GetUserInfoDTO, GetUserInfoUseCaseResponse> {
  protected userRepo: IUserRepo;
  protected getUserByUIDUseCase: GetUserByUIDUseCase;
  constructor(userRepo: IUserRepo, getUserByUIDUseCase: GetUserByUIDUseCase) {
    this.userRepo = userRepo;
    this.getUserByUIDUseCase = getUserByUIDUseCase;
  }

  async execute(request: GetUserInfoDTO): Promise<GetUserInfoUseCaseResponse> {
    const response = await this.getUserByUIDUseCase.execute({ uid: request.id });

    if (response.isLeft()) {
      return left(response.value);
    }

    return right({
      phone_number: response.value.phone_number,
      email: response.value.email,
      name: response.value.display_name,
      username: response.value.username
    });
  }
}

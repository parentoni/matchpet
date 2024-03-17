import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UserMap } from "../../mappers/userMap";
import { IUserRepo } from "../../repository/IUserRepo";
import { GetAllUsersDTO } from "./getAllUsersDTO";
import { GetAllUsersResponse } from "./getAllUsersResponse";

/**
 * 
 * @class GetAllUsersUseCase
 * @classdesc Get all users, with pagination support, intended only for admin usage
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class GetAllUsersUseCase implements UseCase<GetAllUsersDTO, GetAllUsersResponse> {

  userRepo: IUserRepo
  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo
  }
  
  async execute(request: GetAllUsersDTO):  Promise<GetAllUsersResponse> {
    const result = await this.userRepo.allUsers(request)

    if (result.isLeft()) {
      return left(result.value)
    }

    const mapperResult = await UserMap.toPersistentBulk(result.value)
    return right(mapperResult)
    

  }

}


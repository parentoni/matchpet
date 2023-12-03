import _ from "lodash";
import { UseCase } from "../../../../shared/core/UseCase";
import { EditUserDTO } from "./EditUserDTO";
import { EditUserResponse } from "./EditUserResponse";
import { IUserRepo } from "../../repository/IUserRepo";
import { left, right } from "../../../../shared/core/Result";
import { UserMap } from "../../mappers/userMap";
import { IUserPersistant } from "../../../../shared/infra/database/models/User";

export class EditUserUseCase implements UseCase<EditUserDTO, EditUserResponse> {
  
  private userRepo:IUserRepo
  constructor (userRepo: IUserRepo) {
    this.userRepo = userRepo
  }
  
  async execute(request: EditUserDTO):Promise<EditUserResponse> {
    const userRepoResponse = await this.userRepo.find_one({filter: {_id: request.jwt.uid}})

    if (userRepoResponse.isLeft()) {
      return left(userRepoResponse.value)
    }

    const oldUserInPersistent = await UserMap.toPersistant(userRepoResponse.value)

    if (oldUserInPersistent.isLeft()) {
      return left(oldUserInPersistent.value)
    }

    const persistentNewUser: IUserPersistant = {

      ...oldUserInPersistent.value,

      display_name: request.edit.display_name || oldUserInPersistent.value.display_name,
      phone_number: request.edit.phone || oldUserInPersistent.value.phone_number,
      location: {
        type: "Point",
        coordinates: request.edit.location || oldUserInPersistent.value.location.coordinates
      },
      description: request.edit.description || oldUserInPersistent.value.description,
      image:  request.edit.image || oldUserInPersistent.value.image,

      
    }

    const newUser = await UserMap.toDomain(persistentNewUser)
    if (newUser.isLeft()) {
      return left(newUser.value)
    }

    const saveResult = await this.userRepo.create({dto: newUser.value})
    if (saveResult.isLeft()) {
      return left(saveResult.value)
    }

    return right(persistentNewUser)
  }
}
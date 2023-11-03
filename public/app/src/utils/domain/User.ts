import { IUserContactDTO } from "../services/dtos/UserContactDTO";
import { IUserPersistent } from "../services/dtos/UserDTO";
import { Api } from "../services/Api";
import { Either, left, right } from "../shared/Result";

export class User {

  public static async getUserContactInfo(id:string): Promise<Either<Response, IUserContactDTO>> {
    const response = await Api.get(`/user/${id}/contact`)
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(response.value as IUserContactDTO)
  }

  public static async getAllActiveOrganizations(): Promise<Either<Response, IUserPersistent[]>> {
    const response = await Api.get('/user/active')
    if (response.isLeft()) {
      return left(response.value)
    }

    return right( response.value as IUserPersistent[])
  }
}
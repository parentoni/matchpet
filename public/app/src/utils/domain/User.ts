import { IUserContactDTO } from "../services/dtos/UserContactDTO";
import { IUserPersistent } from "../services/dtos/UserDTO";
import { Api } from "../services/Api";
import { Either, left, right } from "../shared/Result";


export interface ISignInUserProps {
  display_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  location: [number, number];
}
export class User {
  public static async getUserContactInfo(id: string): Promise<Either<Response, IUserContactDTO>> {
    const response = await Api.get(`/user/${id}/contact`);
    if (response.isLeft()) {
      return left(response.value);
    }

    return right(response.value as IUserContactDTO);
  }

  public static async getAllActiveOrganizations(): Promise<Either<Response, IUserPersistent[]>> {
    const response = await Api.get("/user/active");
    if (response.isLeft()) {
      return left(response.value);
    }

    return right(response.value as IUserPersistent[]);
  }

  public static async getUserByUsername(username: string) :Promise<Either<Response, IUserPersistent>> {
    const response = await Api.post("/user/username", JSON.stringify({username: username}))
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(response.value as IUserPersistent)
  }


  public static async signInUser(props: ISignInUserProps): Promise<Either<string, string>> {

    const response = await Api.post('/auth/register', JSON.stringify(props))
    if (response.isLeft()) {
      
      const data = await response.value.json()
      return left(data.message.printableErrorMessage || `Erro desconhecido, contate <parentoni.arthur@gmail.com>. COD ERROR: ${data.message.location}:${data.message.variable}`)
    }
    return right('ok')
  }

}

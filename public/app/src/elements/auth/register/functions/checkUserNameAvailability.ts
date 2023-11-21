import { User } from "../../../../utils/domain/User"

export const userNameIsTaken = async (username:string): Promise<boolean> => {
  const response = await User.getUserByUsername(username)
  if (response.isLeft()) {
    return false
  }

  return true
}
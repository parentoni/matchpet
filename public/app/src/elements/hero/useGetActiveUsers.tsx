import { useEffect, useState } from "react"
import { IUserPersistent } from "../../utils/services/dtos/UserDTO"
import { User } from "../../utils/domain/User"

export const useGetActiveUsers = () => {
  const [users, setUsers] = useState<IUserPersistent[]>([])

  useEffect(() => {
    User.getAllActiveOrganizations().then(response => {
      if (response.isRight()) {
        setUsers(response.value)
      }
    })
  }, [])

  return users
}
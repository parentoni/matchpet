import React, { createContext, useEffect, useState } from "react";
import { IUserPersistent } from "../services/dtos/UserDTO";
import { User } from "../domain/User";

export const OrganizationsContext = createContext<{organizations: IUserPersistent[]}>({organizations: []})
export const OrganizationsProvider = ({children}: React.PropsWithChildren<{}>) => {
  const [organizations, setOrganizations] = useState<IUserPersistent[]>([])

  useEffect(() => {
    User.getAllActiveOrganizations().then(response => {
      if (response.isLeft()) {
        return alert("Não foi possível encontrar as organizacoes.")
      }

      setOrganizations(response.getRight())
    })
  }, [])

  return(
    <OrganizationsContext.Provider value={{organizations: organizations}}>
      {children}
    </OrganizationsContext.Provider>
  )
} 
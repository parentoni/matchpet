import React, { createContext, useEffect, useState } from "react";
import { ICategoryDTO } from "../services/dtos/CategoryDTO";
import { Category } from "../domain/category";

export const CategoriesContext = createContext<{categories: ICategoryDTO[]}>({categories: []})

export const CategoriesContextProvider = ({children}: React.PropsWithChildren<{}>) => {
  const [categoriesDTO, setCategoriesDTO] = useState<ICategoryDTO[]>([])

  useEffect(() => {
    Category.getAll().then((response) => {
      if (response.isLeft()) {
        alert("Não foi possível carregar dados de categorias")
      } else {
        setCategoriesDTO(response.value)
      }
    })
  }, [])
  return(
    <CategoriesContext.Provider value={{categories: categoriesDTO}}>
      {children}
    </CategoriesContext.Provider>
  )
}
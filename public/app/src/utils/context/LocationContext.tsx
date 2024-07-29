import { createContext, useEffect, useRef } from "react";
import { NavigateFunction} from "react-router-dom";
import { IbgeMesoregion } from "../services/dtos/IbgeLocatin";


/**
 * Ibge id is the id of the user's selected mesoregion
 * */
export type LocationContextInterface = {
  ibgeId: IbgeMesoregion,
  ensureLocationIsSelected: (navigate: NavigateFunction) => void,
  changeLocation: (newLocation: IbgeMesoregion) => void;
};

const LocationContextDefault = {
  ibgeId: {id:"", nome: "", UF: {
    id:"",
    nome:"",
    sigla:"", 
    regiao:{
      id:"",
      nome:"",
      sigla:"",
    }}
  }, 
  ensureLocationIsSelected: () => {},
  changeLocation: () => {},
};

export const LocationContext = createContext<LocationContextInterface>(LocationContextDefault);
export const LocationContextProvider = ({children}: React.PropsWithChildren<{}>) => {

  const ibgeId = useRef<IbgeMesoregion>(LocationContextDefault.ibgeId);

  useEffect(() => {
    const id = localStorage.getItem("ibgeid");
    if (id == null || !id) return;
    ibgeId.current = JSON.parse(id);
  }, [])

  const ensureLocationIsSelected = (navigate: NavigateFunction) => {
    if (ibgeId.current && ibgeId.current != null) return;
    navigate(`/location?to=${window.location.pathname}`);
  }

  const changeLocation = (newLocation:IbgeMesoregion) => {
    localStorage.setItem("ibgeid", JSON.stringify(newLocation));
    ibgeId.current = newLocation;
  }

  return (
    <LocationContext.Provider value={{ibgeId: ibgeId.current, ensureLocationIsSelected, changeLocation}}> {children}
    </LocationContext.Provider>
  )

  
}


import { createContext, useEffect, useRef } from "react";
import { NavigateFunction} from "react-router-dom";
import { IbgeMesoregion } from "../services/dtos/IbgeLocatin";


/**
 * Ibge id is the id of the user's selected mesoregion
 * */
export type LocationContextInterface = {
  ibgeId: () => IbgeMesoregion | null,
  ensureLocationIsSelected: (navigate: NavigateFunction) => void,
  changeLocation: (newLocation: IbgeMesoregion) => void;
};

const LocationContextDefault = {
  ibgeId: () => null,
  ensureLocationIsSelected: () => {},
  changeLocation: () => {},
};

export const LocationContext = createContext<LocationContextInterface>(LocationContextDefault);
export const LocationContextProvider = ({children}: React.PropsWithChildren<{}>) => {

  let ibgeIdMemo: IbgeMesoregion | null = null;

  const ibgeId = () => { 
    if (ibgeIdMemo == null) {
      const id = localStorage.getItem("ibgeid");
      if (id == null || !id) return null;
      ibgeIdMemo = JSON.parse(id);
    }

    return ibgeIdMemo
  }

  const ensureLocationIsSelected = (navigate: NavigateFunction) => {
    console.log(ibgeId())
    if (ibgeId() != null) return;
    // navigate(`/regions`);
    navigate(`/regions?to=${window.location.pathname}`);
  }

  const changeLocation = (newLocation:IbgeMesoregion) => {
    localStorage.setItem("ibgeid", JSON.stringify(newLocation));
    ibgeIdMemo = newLocation;
    // console.log("HA", ibgeId.current)
  }

  return (
    <LocationContext.Provider value={{ibgeId: ibgeId, ensureLocationIsSelected, changeLocation}}> {children}
    </LocationContext.Provider>
  )

  
}


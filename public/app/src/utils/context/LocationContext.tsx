import { createContext, useEffect, useRef, useState} from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";


/**
 * Ibge id is the id of the user's selected mesoregion
 * */
export type LocationContextInterface = {
  ibgeId: string,
  ensureLocationIsSelected: (navigate: NavigateFunction) => void,
  changeLocation: (newLocation: string) => void;
};

const LocationContextDefault = {
  ibgeId: "", 
  ensureLocationIsSelected: (navigate:NavigateFunction) => {},
  changeLocation: (newLocation:string) => {},
};

export const LocationContext = createContext<LocationContextInterface>(LocationContextDefault);
export const LocationContextProvider = ({children}: React.PropsWithChildren<{}>) => {

  const ibgeId = useRef<string>("");

  useEffect(() => {
    const id = localStorage.getItem("ibgeid");
    if (id == null || !id) return;
    ibgeId.current = id;
  }, [])

  const ensureLocationIsSelected = (navigate: NavigateFunction) => {
    if (ibgeId.current && ibgeId.current != null) return;
    navigate(`/location?to=${window.location.pathname}`);
  }

  const changeLocation = (newLocation:string) => {
    localStorage.setItem("ibgeid", newLocation);
    ibgeId.current = newLocation;
  }


  return (
    <LocationContext.Provider value={{ibgeId: ibgeId.current, ensureLocationIsSelected, changeLocation}}> {children}
    </LocationContext.Provider>
  )

  
}


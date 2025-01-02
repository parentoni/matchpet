import { IbgeMesoregion, IbgeState } from "../services/dtos/IbgeLocatin"

export const loadStates =  async (): Promise<IbgeState[]> => {
  const res = await fetch("states.json");
  if (!res.ok) {
    console.log(res); return [];
  }

  const data = await res.json() as IbgeState[]
  return data
}
/**
 *
 * Function responsible for loading the mesoregions metadata; should take the state id as input
 *
 */
export const loadMesoregions = async (ibgeStateId: string): Promise<IbgeMesoregion[]> => {
  const res = await fetch(`${ibgeStateId}.json`);
  if (!res.ok) {
    console.log(res); return [];
  }

  const data = await res.json() as IbgeMesoregion[]
  return data
}

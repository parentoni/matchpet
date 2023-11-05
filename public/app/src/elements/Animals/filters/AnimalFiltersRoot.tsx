import { createContext, useState } from "react";
import { PageLayout } from "../../../PageLayout";
import { Specie } from "../../../utils/domain/Specie";
import { FILTER_MODES } from ".";

interface Props {
  selectedSpecie: Specie,

}


export function AnimalFiltersRoot (props: React.PropsWithChildren<Props>) {


  return (
    <div className="px-8 flex flex-col ">
        {props.children}
    </div>
  )
}
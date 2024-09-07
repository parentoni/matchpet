import { Specie } from "../../../utils/domain/Specie";

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

import { ISpecieTraitOptionsDTO } from "../../../utils/services/dtos/SpecieDTO"
import { useContext, useEffect, useState } from "react"
import { FILTER_MODES } from "."
import { FiltersContext } from "../../../utils/context/FiltersContext"

interface Props {
  title: string,
  options: ISpecieTraitOptionsDTO[],
  trait_name: string,
  setFilters: (x: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
}

export function ChoiceFilter (props: Props) {

  const [selectedValue, setSelectedValue] = useState<string| undefined>()

  const changeFilters = (option:string) => {
    props.filters[props.trait_name] = [{mode: FILTER_MODES.EQUAL, comparation_value: option}]
    props.setFilters(structuredClone(props.filters))
  }

  const clearFilter = () => {
    delete props.filters[props.trait_name]
    props.setFilters(structuredClone(props.filters))
  }

  useEffect(() => {

    const selectedTraitFilter = props.filters[props.trait_name]

    if (selectedTraitFilter !== undefined) {
      setSelectedValue(selectedTraitFilter[0].comparation_value)
    } else {
      setSelectedValue(undefined)
    }
    
  }, [props.filters, props.trait_name])


  
  return (
    <div className="flex flex-col gap-2">
      <h2 className=" text-sm">{props.title}</h2>
      <div className="flex gap-3 overflow-x-scroll overflow-y-hidden no-scrollbar">
        <button className={`px-4 text-xs py-1 brute-border rounded-full flex items-center justify-center  whitespace-nowrap ${selectedValue?"":"bg-black text-white"}`} onClick={() => clearFilter()}>
          Tanto faz
        </button>
        {props.options.map((option, index) => (
          <button key={index} className={`px-4 py-1  text-xs  brute-border rounded-full flex items-center justify-center  whitespace-nowrap ${selectedValue === option._id?"bg-black text-white":""}`} onClick={() => changeFilters(option._id)}>
            {option.name}
          </button>
        ))}
      </div>
    </div>
  )
}
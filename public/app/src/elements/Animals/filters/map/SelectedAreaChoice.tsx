import { useContext, useEffect, useState } from "react";
import { OrganizationsContext } from "../../../../utils/context/OrganizationsContext";
import { FiltersContext } from "../../../../utils/context/FiltersContext";
import * as turf from '@turf/turf'
import { FILTER_MODES } from "..";

export interface SelectedAreaChoiceProps {
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  setFilters: (x:Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
  searchArea: [number, number][],
  setSearchArea: (x: [number, number][]) => void
}
export const SelectedAreaChoice = (props: SelectedAreaChoiceProps) => {

  const { organizations } = useContext(OrganizationsContext);

  const [mode, setMode] = useState<'area' | 'organization' | undefined>();
  const [text, setText] = useState<string>();

  useEffect(() => {
    if (props.filters['donator_id']) {
      setMode('organization');
    } else if (props.searchArea.length > 0) {
      setMode('area')
    }
     else {
      setMode(undefined);
    }
  }, [props.filters, props.searchArea]);

  useEffect(() => {
    if (mode === 'organization' && props.filters['donator_id']) {
      const index = organizations.findIndex(x => x._id === props.filters['donator_id'][0].comparation_value);
      setText((organizations[index].display_name));
    }

    if (mode === 'area' && props.searchArea.length > 0) {
      const area = turf.area(turf.polygon([props.searchArea]))
      setText(`${(area / 1e6).toFixed(2)} km²`)
    }
  }, [mode, props.filters, organizations, props.searchArea]);

  const cleanLocationFilters = () => {
    if (mode === 'organization') {
      delete props.filters['donator_id'];
      props.setFilters(structuredClone(props.filters));
    }

    if (mode === 'area') {
      props.setSearchArea([])
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h2 className=" font-semibold">Área selecionada {mode === 'organization'?"(Abrigo)": mode === 'area'? "(km²)":''}</h2>
      <div className="flex gap-3 overflow-x-scroll overflow-y-hidden no-scrollbar">
        <button className={`px-4 text-xs py-1 brute-border rounded-full flex items-center justify-center  whitespace-nowrap ${mode ? "" : "bg-black text-white"}`} onClick={() => cleanLocationFilters()}>
          Nenhuma
        </button>
        {mode &&
          <button className={`px-4 py-1  text-xs  brute-border rounded-full flex items-center justify-center  whitespace-nowrap bg-black text-white`} onClick={() => { }}>
            {text}
          </button>}
      </div>
    </div>
  );
};

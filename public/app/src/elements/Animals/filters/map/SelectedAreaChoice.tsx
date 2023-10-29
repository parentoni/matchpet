import { useContext, useEffect, useState } from "react";
import { OrganizationsContext } from "../../../../utils/context/OrganizationsContext";
import { FiltersContext } from "../../../../utils/context/FiltersContext";
import * as turf from '@turf/turf'
export const SelectedAreaChoice = () => {

  const { filters, setFilters, searchArea, setSearchArea} = useContext(FiltersContext);
  const { organizations } = useContext(OrganizationsContext);

  const [mode, setMode] = useState<'area' | 'organization' | undefined>();
  const [text, setText] = useState<string>();

  useEffect(() => {
    if (filters['donator_id']) {
      setMode('organization');
    } else if (searchArea.length > 0) {
      setMode('area')
    }
     else {
      setMode(undefined);
    }
  }, [filters, searchArea]);

  useEffect(() => {
    if (mode === 'organization' && filters['donator_id']) {
      const index = organizations.findIndex(x => x._id === filters['donator_id'][0].comparation_value);
      setText((organizations[index].first_name + ' ' + organizations[index].last_name));
    }

    if (mode === 'area' && searchArea.length > 0) {
      const area = turf.area(turf.polygon([searchArea]))
      setText(`${(area / 1e6).toFixed(2)} km²`)
    }
  }, [mode, filters, organizations, searchArea]);

  const cleanLocationFilters = () => {
    if (mode === 'organization') {
      delete filters['donator_id'];
      setFilters(structuredClone(filters));
    }

    if (mode ==='area') {
      setSearchArea([])
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h2 className=" font-semibold">Área selecionada</h2>
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

import { useMap } from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { renderToStaticMarkup } from 'react-dom/server';
import { OrganizationsContext } from "../../../../utils/context/OrganizationsContext";
import L, { Marker, marker } from "leaflet";
import { FILTER_MODES } from "..";

export interface OrganizationsMarkersProps {
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  setFilters: (x:Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
  drawing: boolean,
}
export const OrganizationsMarkers = (props: OrganizationsMarkersProps) => {

  const map = useMap();
  const { organizations } = useContext(OrganizationsContext);
  const [markers, setMarkers] = useState<Marker[]>([]);
  useEffect(() => {

    if (organizations.length >= 0 && organizations) {
      if (markers.length > 0) {
        for (const marker of markers) {
          map.removeLayer(marker);
        }
      }

      // alert(organizations.length)

      let biggest = organizations[0]?.in_adoption || 0;
      for (const organization of organizations) {
        console.log(organization, 'oi', organizations)
        if (organization.in_adoption > biggest) {
          biggest = organization?.in_adoption || 0;
        }
      }

    for (const organization of organizations) {

      //Maybe clean the code
      const isSelected = props.filters['donator_id'] ? props.filters['donator_id'][0].comparation_value === organization._id ? true : false : true;
      const markup = renderToStaticMarkup(

        <div id={organization._id} className={`h-full  text-lg flex flex-col justify-center items-center rounded-full custom-marker-cluster  font-semibold ${isSelected ? "bg-white" : 'bg-white opacity-80 bg-opacity-80'}`}>
          {organization.in_adoption}
        </div>);

      const m = marker([organization.location.coordinates[1], organization.location.coordinates[0]], {
        icon: L.divIcon({
          html: markup,
          iconSize: L.point(20 * (organization.in_adoption / biggest) + 30, 20 * (organization.in_adoption / biggest) + 30, true),
          className: `rounded-full border-black border `,
        }),
        interactive: !props.drawing,
        zIndexOffset:1
      });

      m.addTo(map);
      m.addEventListener('click', () => {
        props.filters['donator_id'] = [{ mode: FILTER_MODES.EQUAL, comparation_value: organization._id }];
        props.setFilters(structuredClone(props.filters));
      });

      markers.push(m);

      setMarkers(markers.slice(0));


    }

    }

    
    

  }, [organizations, props.filters, props.drawing]);

  return null;
};

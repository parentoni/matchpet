import { MapContainer, Pane, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { DivOverlay, Map, circle }from "leaflet";
import { OrganizationsMarkers } from "./map/OrganizationsMarkers";
import { SelectedAreaChoice } from "./map/SelectedAreaChoice";
import { DrawSearchAreaControl } from "./map/DrawSearchAreaButton";
import { useContext, useState } from "react";
import { DrawSearchArea } from "./map/DrawSearchArea";
import { FiltersContext } from "../../../utils/context/FiltersContext";
import { FILTER_MODES } from ".";


const ComponentResize = () => {
  const map = useMap()

  setTimeout(() => {
      map.invalidateSize()
  }, 0)

  return null
}

export interface LocationFiltersProps {
  className?: string,
  searchArea: [number,number][],
  setSearchArea: (x: [number, number][]) => void,
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  setFilters: (x:Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void
}
export function LocationFilter (props: LocationFiltersProps) {

  // const {searchArea} = useContext(FiltersContext
  const [isDrawing, setIsDrawing] = useState<boolean>(props.searchArea.length>0?true:false)
  const [firstPoint, setFirstPoint] = useState<[number, number] | undefined>(props.searchArea.length>0?[props.searchArea[0][1], props.searchArea[0][0]]:undefined)
  const [secondPoint, setSecondPoint] = useState<[number, number] | undefined>(props.searchArea.length>0?[props.searchArea[2][1], props.searchArea[2][0]]:undefined)

  return (
  <div className={`py-5 flex flex-col gap-5 ${props.className}`}>
    <h2 className="font-semibold">Localização</h2>
    <MapContainer zoom={12} center={[-19.92272511866239, -43.945159428103494]} style={{width: '100%', aspectRatio: 1/1}} scrollWheelZoom={false} className="mt-2 brute-border" maxZoom={13} minZoom={8}>
      <ComponentResize />

      <DrawSearchAreaControl setSearchArea={props.setSearchArea} searchArea={props.searchArea} setIsDrawing={setIsDrawing} drawing={isDrawing} firstPosition={firstPoint} secondPosition={secondPoint}/>
      <DrawSearchArea searchArea={props.searchArea} filters={props.filters} setFilters={props.setFilters} setSearchArea={props.setSearchArea} drawing={isDrawing} setIsDrawing={setIsDrawing} firstPoint={firstPoint} setFirstPoint={setFirstPoint} secondPoint={secondPoint} setSecondPoint={setSecondPoint}/>

      <OrganizationsMarkers setFilters={props.setFilters} filters={props.filters} drawing={isDrawing}/>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
      </MapContainer>
    <SelectedAreaChoice  searchArea={props.searchArea} setSearchArea={props.setSearchArea} filters={props.filters} setFilters={props.setFilters}/>
  </div>)
}


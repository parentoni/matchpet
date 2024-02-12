import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { Marker, icon,  marker } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"

export interface RegisterLocationInputProps {
 title:string,
 location: [number, number] | undefined,
 setLocation: (x:[number, number] | undefined) => void,
 errorMessage?: string
}

export function RegisterLocationInput (props:RegisterLocationInputProps) {
  return (
  <div className="flex flex-col gap-1">
    <div className="flex gap-3 items-center text-base">
      <label className="font-medium">{props.title}</label>
    </div>
    <MapContainer zoom={12} center={[-19.92272511866239, -43.945159428103494]} style={{width: '100%', aspectRatio: 1/1}} scrollWheelZoom={false} className={`mt-2 border brute-border `}  minZoom={8}>
      <RegisterLocationControl location={props.location} setLocation={props.setLocation}/>
      <DrawLocation location={props.location} setLocation={props.setLocation}/>
      <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
    </MapContainer>
    <span className="text-sm mt-1">Não se preocupe, <b>não divulgaremos a sua localização exata</b>. Contudo, caso se sinta mais confortável, selecione apenas o bairro em que você está localizado.</span>
    {props.errorMessage && <span className="text-sm mt-1 text-error">{props.errorMessage}</span>}
  </div>
    )
}

export function RegisterLocationControl ({location, setLocation}:  {location: [number, number] | undefined,setLocation: (x:[number, number]) => void}) {
  return (
    <div className="leaflet-control-container">
      <div className="leaflet-top leaflet-right gap-2">

        <button type="button" className="leaflet-control leaflet-bar bg-white px-2 py-0.5 gap-2 flex items-center" >
          <MapPinned /> {location?<span>Clique novamente para apagar a localizacão</span>:<span>Clique para definir a sua localização</span>}
        </button>

        {/* {props.drawing && !(props.firstPosition && props.secondPosition) &&
         <div className="leaflet-control mt-2 leaflet-bar bg-white px-2 py-0.5 gap-2 flex items-center">
          {!props.firstPosition?"Clique para adicionar o 1º ponto": "Clique para adicionar o 2º ponto"}
         </div>
        } */}
      </div>
    </div>
  )
}

export function DrawLocation({location, setLocation}: {location: [number, number] | undefined ,setLocation: (x:[number, number] | undefined) => void}) {

  const [usedMarker, setUsedMarker] = useState<Marker>()
  const map = useMap()
  useMapEvent('click', e => {
    if (location && usedMarker) {
      setLocation(undefined)
    } else {
      setLocation([e.latlng.lng, e.latlng.lat])
    }
  })

  useEffect(() => {
    if (location) {
      const c = marker([location[1], location[0]], {icon: icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})})
      map.addLayer(c)
      setUsedMarker(c)
    } else if (!location && usedMarker) {
      map.removeLayer(usedMarker)
      setUsedMarker(undefined)
    }
  }, [location])
  
  return null
}

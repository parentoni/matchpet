import {MapContainer, TileLayer,Popup, useMapEvents, useMapEvent} from 'react-leaflet'
// import './testing.css'lloc
import 'leaflet/dist/leaflet.css'
import { Icon, Layer, Map, Marker, latLng, marker, polygon} from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import MarkerIcon from '../../assets/marker-icon.png'
export const Testing = () => {
  const position: [number, number] = [-19.92272511866239, -43.945159428103494]

  const [editing, setEditing] = useState<boolean>(false)
  const [firstCords, setFirstCords] = useState<[number, number]>()
  const [secondCords, setSecondCords] = useState<[number, number]>()

  const [firstCoordsMarker, setFirstCoordsMarker] = useState<Marker<any>>()

  const [map, setMap] = useState<Map|null>(null)

  const markerIcon = new Icon({
    iconUrl: MarkerIcon
  })
  useEffect(() => {
    if (firstCords && !secondCords && map) {
      setFirstCoordsMarker(marker(firstCords, {icon: markerIcon}))
    }
    if (firstCords && secondCords && map) {
      polygon([firstCords, [firstCords[0], secondCords[1]],secondCords, [secondCords[0], firstCords[1]]]).addTo(map)
    }
  }, [firstCords, secondCords])

  useEffect(() => {
    if (firstCoordsMarker && map) {
      map.addLayer(firstCoordsMarker)
    }

    if (secondCords && firstCoordsMarker && map) {
      map.removeLayer(firstCoordsMarker)
    }
  }, [firstCoordsMarker, secondCords])

  return (
    <div>

    <MapContainer zoom={13} center={position} style={{width:500, height:500}} ref={setMap}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <Interaction editing={editing} firstCords={firstCords} setFirstCoords={setFirstCords} secondCords={secondCords} setSecondCoords={setSecondCords}/>
    </MapContainer>
        </div>
  )
}

const Interaction = (props: {editing:boolean, firstCords: [number, number] | undefined, setFirstCoords: (x: [number,number]) => void ,  secondCords: [number, number] | undefined, setSecondCoords: (x: [number,number]) => void}) => {
  
  
  const map = useMapEvent('mousedown', (e) => {
    if (!props.firstCords) {
      props.setFirstCoords([e.latlng.lat, e.latlng.lng])
    } else if (!props.secondCords) {
      // props.secondCords = [e.latlng.lat, e.latlng.lng]
      props.setSecondCoords([e.latlng.lat, e.latlng.lng])
    }



    // polygon(e.latlng.toBounds(2), {fillColor: 'blue'})
    

    
  })

  return null
}


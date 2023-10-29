import L, { Circle, LatLngExpression, Marker, Polygon, circle, latLng, marker, polygon } from "leaflet"
import { useContext, useEffect, useState } from "react"
import { useMap, useMapEvent } from "react-leaflet"
import { FiltersContext } from "../../../../utils/context/FiltersContext"

export interface DrawSearchAreaProps {
  drawing : boolean,
  setIsDrawing: (x:boolean) => void,
  firstPoint: [number, number] | undefined,
  setFirstPoint: (x: [number, number] | undefined) => void,
  secondPoint: [number, number] | undefined,
  setSecondPoint: (x: [number, number] | undefined) => void
}

export const DrawSearchArea = (props: DrawSearchAreaProps) => {
  const map = useMap()

  const {filters, setFilters, setSearchArea } = useContext(FiltersContext)
  const [usedMarker, setUsedMarker] = useState<Circle>()
  const [usedPolygon, setUsedPolygon] = useState<Polygon>()

  useMapEvent('click' ,(e) => {
    if (props.drawing) {
      if (!props.firstPoint) {
        props.setFirstPoint([e.latlng.lat, e.latlng.lng])
      } else if (!props.secondPoint) {
        props.setSecondPoint([e.latlng.lat, e.latlng.lng])
      }
    }
  })

  useEffect(() => {
    if (props.firstPoint && !props.secondPoint) {
      const m = circle(props.firstPoint, {
        radius: 200,
        color: '#000',
        fillColor: '#FFA1F5',
        fillOpacity: 1,
        weight: 1,
      }
        )
      
      map.addLayer(m)
      setUsedMarker(m)
    } else if (props.firstPoint && props.secondPoint) {
      const path = [[props.firstPoint[1], props.firstPoint[0]], [props.firstPoint[1], props.secondPoint[0]], [props.secondPoint[1], props.secondPoint[0]], [props.secondPoint[1], props.firstPoint[0]], [props.firstPoint[1], props.firstPoint[0]]] as [number, number][]
      const p = polygon([props.firstPoint, [props.firstPoint[0], props.secondPoint[1]], props.secondPoint, [props.secondPoint[0], props.firstPoint[1]]], {
        fillColor: '#FFA1F5',
        color: '#FFA1F5',
        className: 'z-2',
        interactive: false,
        
      })

      map.addLayer(p)
      if (usedMarker) {
        map.removeLayer(usedMarker)
      }

      if (filters['donator_id']) {
        delete filters['donator_id']
        setFilters(structuredClone(filters))
      }
      setSearchArea(path)
      setUsedPolygon(p)
    } 

  }, [props.firstPoint, props.secondPoint])

  useEffect(() => {
    if (!props.drawing) {
      if (usedMarker) {
        map.removeLayer(usedMarker)
        setUsedMarker(undefined)
      }

      if (usedPolygon) {
        map.removeLayer(usedPolygon)
        setUsedMarker(undefined)
      }

      props.setFirstPoint(undefined)
      props.setSecondPoint(undefined)

    }
  }, [props.drawing])
  return null
}
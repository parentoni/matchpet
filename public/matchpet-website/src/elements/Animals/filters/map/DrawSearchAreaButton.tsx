import { DraftingCompass } from 'lucide-react';

export interface DrawSearchAreaProps {
  drawing: boolean,
  setIsDrawing: (x: boolean) => void,
  firstPosition: [number, number] | undefined,
  secondPosition: [number, number] | undefined,
  searchArea: [number, number][],
  setSearchArea: (x: [number, number][]) => void
}
export const DrawSearchAreaControl = (props: DrawSearchAreaProps) => {
  
  const stopDrawing = () => {
    props.setIsDrawing(!props.drawing)
    if (props.searchArea.length>0) {
      props.setSearchArea([])
    }
  }
  return (
    <div className="leaflet-control-container">
      <div className="leaflet-top leaflet-right gap-2">
        <button className="leaflet-control leaflet-bar bg-white px-2 py-0.5 gap-2 flex items-center" onClick={stopDrawing}>
          <DraftingCompass />{props.drawing?"Apagar desenho":"Desenhar área"}
        </button>

        {props.drawing && !(props.firstPosition && props.secondPosition) &&
         <div className="leaflet-control mt-2 leaflet-bar bg-white px-2 py-0.5 gap-2 flex items-center">
          {!props.firstPosition?"Clique para adicionar o 1º ponto": "Clique para adicionar o 2º ponto"}
         </div>
        }
      </div>
    </div>
  )
}
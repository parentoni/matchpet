import { useEffect } from "react"
import { loadMesoregions, loadStates } from "../../utils/data/loadIbge"

export const Testing = () => {

  useEffect(() => {
    loadStates().then(res => {
      console.log("states", res);
      for (const st of res) {
        loadMesoregions(st.id).then(mes => {
          console.log(st.nome, ": ", mes)
        })
      }
    })
  }, [])

  return (
      <div className="max-w-[60%] bg-neutral-50 border p-2 flex flex-col border-r-0 rounded rounded-r-none ">
        <p className="text-sm">Adote <span className="text-primary">Remi</span>, fêmea.</p>
        <p className="text-[0.5rem]"> Detalhes na <span className="text-primary">próxima página</span>.</p>
      </div>

  )
}



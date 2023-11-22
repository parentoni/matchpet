import { useContext } from "react"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
import { useNavigate, useSearchParams } from "react-router-dom"

export const AnimalSelect = () => {

  const {species, setPreferredSpecie} = useContext(SpeciesContext)
  const [searchParams, _] = useSearchParams()

  const navigate = useNavigate()

  const setSelected = (id: string) => {
    setPreferredSpecie(id)
    console.log(id)
    navigate(searchParams.get('to') || '/animals')
  }

  return (
    <div>
      <div className="w-full border-b "></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 md:mt-56">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"><span className="text-primary">Parabéns</span>, você está mudando a vida de um animal.</h1>
          <p className="mt-6 text-xl text-neutral-600">Escolha abaixo qual a espécie de animal você está interessado.</p>
          <div className="flex gap-5 mt-5">
            {species.map(s => 
            <button className=" h-12 rounded flex items-center justify-center w-60 bg-primary text-white" onClick={() => setSelected(s._id)}>{s.name}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
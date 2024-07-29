import  {useState } from 'react'
import { FilterModal } from '../FilterModal'
export function AnimalFiltersModalContainer ()  {
  
  const [isOpen, setIsOpen] = useState(false)

  // const {countLoading, searchArea, animalsCount, setSearchArea} = useContext(FiltersContext)
  const countLoading = false
  const searchArea: [number, number][] = []
  const animalsCount = 0
  const setSearchArea = () => {}


  return (
    <>
      <AnimalFiltersButton setIsOpen={setIsOpen}/>
      <FilterModal 
        
        loading={countLoading}
        open={isOpen}
        setIsOpen={setIsOpen}
        isPartner={false} 
        animalsCount={animalsCount} 
        searchArea={searchArea} 
        setSearchArea={setSearchArea}
        />
    </>
  )

}



function AnimalFiltersButton ({setIsOpen}: {setIsOpen: (open: boolean) => void}) {
  return (
    <div className='flex gap-5 max-w-7xl mx-auto'>
     <button className="w-full h-11 bg-primary rounded flex justify-center items-center " onClick={() => setIsOpen(true)}>
      <p className='text-white text-xl font-light'>Filtrar</p>
    </button>
    <button className="w-full h-11 brute-border rounded flex justify-center items-center " onClick={() => setIsOpen(true)}>
      <p className=' text-xl font-light'>Ver mapa</p>
    </button>
    </div>
    
  )
}

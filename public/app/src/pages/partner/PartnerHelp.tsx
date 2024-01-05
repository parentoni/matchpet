import { Menu } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import { OutletContextType } from "../../elements/partner/new/PartnerBase"

export const PartnerHelp = () => {
  
  const {setIsOpen} = useOutletContext() as OutletContextType
   
  return (
    <div className="w-full flex flex-col h-screen overflow-y-auto relative">
      <header className="w-full sticky bg-white h-12 border-b flex items-center top-0 px-8 z-10 min-h-12">
        <button onClick={() => setIsOpen(true)} className="flex md:hidden h-12 gap-4 items-center ">
          <Menu />
          <h1 className=" font-medium text-xl">Ajuda</h1>
        </button>
      </header>
  
      <div className="w-full p-8 border-b">

            <h1 className=" font-semibold text-2xl hidden md:block">Precisa de ajuda?</h1>
            <p>Contate <span className="text-primary">parentoni.arthur@gmail.com</span> ou <span className="text-primary">55 31 9 9904-9188</span> a qualquer momento para receber suporte</p>
      </div>
    </div> 
  )
}

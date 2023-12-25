import { Outlet, matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { BadgeHelp, Cat, ChevronDown, ChevronRight, Link2, Plus, Settings } from 'lucide-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../utils/context/AuthContext'
import { usePathPattern } from '../Routes'

export type SidebarType = Record<string, {icon: React.ElementType, name: string, route: string, goTo?:string}[]>
export const pages: SidebarType = {
  "ANIMAIS": [
    {icon: Cat, name: "Todos animais", route: '/partner'},
    {icon: Plus, name: "Adcionar animal", route: '/partner/animal/:id', goTo: '/partner/animal/new'}
  ]
}

export const ProfilePicture = ({image, userName}: {image?:string, userName:string}) => {
  return (
    <div className='w-full h-full bg-neutral-200 rounded flex  items-center justify-center overflow-hidden'>
      {image?<img alt='Imgem de perfil do usuário' className='w-full h-full object-cover' src={image}></img>:<span className='font-bold text-neutral-800'>{userName[0].toUpperCase()}</span>}
    </div>
  )
}

export type OutletContextType = {isOpen: boolean, setIsOpen: (x: boolean) => void}
export function ManagerSidebar () {

  const navigate = useNavigate()
  const {user} = useContext(AuthContext)

  const route = usePathPattern()
  const [isOpen, setIsOpen] = useState(false)

  const mainRef = useRef<HTMLElement | null>(null)
  const asideRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (mainRef.current && asideRef.current) {
      if (isOpen ) {
        mainRef.current.setAttribute('style',  `transform: translate(${asideRef.current.getBoundingClientRect().width}px)`)
      } else {
        mainRef.current.setAttribute('style', '')
      }
    }
  }, [isOpen])

  return(
    <div className='flex w-full h-full'>
      <aside ref={asideRef} className={`md:static md:transition-none transition-all duration-150 ease-linear absolute w-60  h-screen bg-neutral-50 border-r flex flex-col -translate-x-full md:translate-x-0 ${isOpen? "translate-x-0 ": ""}`}>
        <div className='px-5 h-12 flex items-center w-full border-b'>
          {user &&
            <div className='flex gap-2 items-center'>
              <div className='h-6 w-6'>
                <ProfilePicture image={user.image} userName={user.display_name}/>
              </div>
              <p className='text-sm text-neutral-800 line-clamp-1'>{user.display_name}</p>
            </div>
          }
        </div>

        <div className='px-2 py-4 flex-1 border-b'>
          {Object.keys(pages).map((name, index) => <SidebarSection key={index} name={name}items={pages[name]} />)}
        </div>
        <div className='px-2 py-4'>

          <button onClick={() => {navigator.clipboard.writeText(`https://www.matchpet.org/partners/${user?.username}`).then(() => alert("Link da página de seu projeto copiado para a sua área de transferência."))}} className={`h-8 w-full  flex items-center gap-3 px-3 rounded ${route === '/partner/help'?"bg-primary bg-opacity-10":"hover:bg-opacity-5 hover:bg-black"}`}>
            <Link2 className={`w-4 h-4 text-neutral-800 ${route === '/partner/help'? "text-primary": ""}`}/>
            <p className={`text-sm text-neutral-800 ${route === '/partner/help'? "text-primary": ""}`}>Link do seu projeto</p>
            <div className='flex-1 flex justify-end'>
              {/* <ChevronRight className={`w-4 h-4 text-neutral-800 ${route === '/partner/help'? "text-primary": ""}`}/> */}
            </div>
          </button>
          
          <button onClick={() => navigate('/partner/config')} className={`h-8 w-full  flex items-center gap-3 px-3 rounded ${route === '/partner/config'?"bg-primary bg-opacity-10":"hover:bg-opacity-5 hover:bg-black"}`}>

            <Settings className={` w-4 h-4 text-neutral-800 ${route === '/partner/config'? "text-primary": ""}`}/>
            <p className={`text-sm text-neutral-800 ${route === '/partner/config'? "text-primary": ""}`}>Configurações</p>
            <div className='flex-1 flex justify-end'>
              <ChevronRight className={`w-4 h-4 text-neutral-800 ${route === '/partner/config'? "text-primary": ""}`} />
            </div>
          </button>

          <button onClick={() => navigate('/partner/help')} className={`h-8 w-full  flex items-center gap-3 px-3 rounded ${route === '/partner/help'?"bg-primary bg-opacity-10":"hover:bg-opacity-5 hover:bg-black"}`}>
            <BadgeHelp className={`w-4 h-4 fill-neutral-300 text-neutral-800 ${route === '/partner/help'? "text-primary": ""}`}/>
            <p className={`text-sm text-neutral-800 ${route === '/partner/help'? "text-primary": ""}`}>Ajuda</p>
            <div className='flex-1 flex fill-neutral-300 justify-end'>
              <ChevronRight className={`w-4 h-4 text-neutral-800 ${route === '/partner/help'? "text-primary": ""}`}/>
            </div>
          </button>


      {/* <button onClick={() => i{}} className={`h-8 w-full  flex items-center gap-3 px-3 rounded ${route === item.route?"bg-primary bg-opacity-10":"hover:bg-opacity-5 hover:bg-black"}`} key={index}>
            <item.icon className={`w-4 h-4 text-neutral-800 ${route === item.route? "text-primary": ""}`}/>
            <p className={`text-sm text-neutral-800  ${route === item.route? "text-primary": ""}`}>{item.name}</p>
          </button> */}
        </div>
      </aside>
      <main className='h-screen transition-all  duration-150 ease-linear flex flex-1  ' onClick={e => isOpen?setIsOpen(false):''} ref={mainRef}>
        <Outlet context={{isOpen, setIsOpen}} />
      </main>
    </div>
  )
}


export const SidebarSection = ({name, items, }: {name: string, items:  {icon: React.ElementType, name: string, route: string, goTo?:string}[]}) => {

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const navigate = useNavigate()
  const route = usePathPattern()

  return (
    <div >
      <div className='pl-3 pr-1 w-full flex items-center text-neutral-800 h-8 justify-between' >
        <p className='text-xs font-semibold'>{name}</p>
        <button className='p-1 px-2 rounded flex items-center justify-center hover:bg-opacity-5 hover:bg-black' onClick={() => setIsOpen(!isOpen)}>
          <div className={`w-4 h-4  duration-150 ease-linear transition-all  ${isOpen?"rotate-0":"-rotate-180"}`} ><ChevronDown className='w-4 h-4' /></div>
        </button>
      </div>
      
        {items.map((item, index) => 
          (isOpen || route === item.route) &&
          <button onClick={() => item.goTo?navigate(item.goTo):navigate(item.route)} className={`h-8 w-full  flex items-center gap-3 px-3 rounded ${route === item.route?"bg-primary bg-opacity-10":"hover:bg-opacity-5 hover:bg-black"}`} key={index}>
            <item.icon className={`w-4 h-4 text-neutral-800 ${route === item.route? "text-primary": ""}`}/>
            <p className={`text-sm text-neutral-800  ${route === item.route? "text-primary": ""}`}>{item.name}</p>
          </button>
          
        )}

    </div>
  )
}
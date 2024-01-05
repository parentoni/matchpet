import { Outlet, matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { BadgeHelp, Cat, ChevronDown, ChevronRight, Link2, LogOut, Plus, Settings, User } from 'lucide-react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../utils/context/AuthContext'
import { usePathPattern } from '../../../Routes'
import { Popover, Transition } from '@headlessui/react'

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
  const {user, protectRoute} = useContext(AuthContext)
  useEffect(() => {
      protectRoute(navigate)
  }, [])

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
    <div className='flex w-screen h-screen flex-shrink-0 flex-grow-0 overflow-x-hidden'>
      <aside ref={asideRef} className={`md:static md:transition-none transition-all duration-150 ease-linear absolute w-60  h-screen bg-neutral-50 border-r flex flex-col -translate-x-full md:translate-x-0 ${isOpen? "translate-x-0 ": ""}`}>
        <div className='border-b flex items-center justify-center px-2 h-12'>
          <ProfileButton />
        </div>

        <div className='px-2 py-4 flex-1 border-b'>
          {Object.keys(pages).map((name, index) => <SidebarSection key={index} name={name}items={pages[name]} />)}
        </div>
        <div className='px-2 py-4'>

          <button onClick={() => {navigator.clipboard.writeText(`https://www.matchpet.org/organizations/${user?.username}`).then(() => alert("Link da página de seu projeto copiado para a sua área de transferência."))}} className={`h-8 w-full  flex items-center gap-3 px-3 rounded ${route === null?"bg-primary bg-opacity-10":"hover:bg-opacity-5 hover:bg-black"}`}>
            <Link2 className={`w-4 h-4 text-neutral-800 ${route === null? "text-primary": ""}`}/>
            <p className={`text-sm text-neutral-800 ${route === null? "text-primary": ""}`}>Link do seu projeto</p>
            <div className='flex-1 flex justify-end'>
              {/* <ChevronRight className={`w-4 h-4 text-neutral-800 ${route === '/partner/help'? "text-primary": ""}`}/> */}
            </div>
          </button>
          
          <button onClick={() => navigate('/partner/config')} className={`h-8 w-full  flex items-center gap-3 px-3 rounded ${route === '/partner/config'?"bg-primary bg-opacity-10":"hover:bg-opacity-5 hover:bg-black"}`}>

            <Settings className={`w-4 h-4  fill-neutral-300 text-neutral-800 ${route === '/partner/config'? "text-primary": ""}`}/>
            <p className={`text-sm  text-neutral-800 ${route === '/partner/config'? "text-primary": ""}`}>Configurações</p>
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

export const ProfileButton = () => {

  const {user, reloadUser} = useContext(AuthContext)
  const navigate = useNavigate()
  return (
        <Popover className="relative w-full">
          {({open}) => (
            <>
              <Popover.Button className={'px-3 h-8 flex items-center w-full rounded hover:bg-black hover:bg-opacity-5'}>
                {user &&
                  <div className='flex gap-2 items-center'>
                    <div className='h-6 w-6'>
                    <ProfilePicture image={user.image} userName={user.display_name}/>
                    </div>
                    <p className='text-sm text-neutral-800 line-clamp-1'>{user.display_name}</p>
                  </div>
                }
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              > 
              <Popover.Panel className="absolute left-0 z-40 py-2 mt-4 w-full transform bg-white  border rounded-lg shadow">
                <div className='w-full  pt-2 pb-3 px-5 border-b'>
                  <div className='flex flex-col'>
                    <p className=' font-semibold text-sm'>{user?.username}</p>
                    <span className='text-xs  text-neutral-700'>{user?.email}</span>
                  </div>
                </div>
                <div className='pt-2 px-2'>
                  <button onClick={() => {localStorage.removeItem('matchpet_token');reloadUser();navigate('/')}} className={`h-8 w-full  flex items-center gap-3 px-3 rounded hover:bg-opacity-5 hover:bg-black`}>
                    <LogOut className={`w-4 h-4 fill-neutral-300 text-neutral-800 `}/>
                    <p className={`text-sm text-neutral-800 `}>Sair da conta</p>
                  </button>
                  
                  <button onClick={() => navigate('/partner/config')} className={`h-8 w-full  flex items-center gap-3 px-3 rounded hover:bg-opacity-5 hover:bg-black`}>
                    <User className={`w-4 h-4 fill-neutral-300 text-neutral-800 `}/>
                    <p className={`text-sm text-neutral-800 `}>Conta</p>
                  </button>
                </div>
              </Popover.Panel>
            </Transition>
            </>
          )}
        </Popover>

  )
}

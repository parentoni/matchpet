import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
export function ManagerBase () {
  const navigate = useNavigate()


  return(
    <>
      <div className="flex w-full px-8 py-5 border-b justify-between">
        <button onClick={() => navigate('/partner')}>
          <img alt="MatchPet logo" src={logo}  className='h-10'></img>
        </button>
        <div className='flex gap-3'>
          <button className={`flex justify-center items-center px-3 font-semibold rounded ${useLocation().pathname === '/partner'? "bg-primary text-white border-0":" brute-border"}`} onClick={() => navigate('/partner')}>
            Administrar animais
          </button>
          <button className={`flex justify-center items-center brute-border px-3 font-semibold rounded ${useLocation().pathname === '/partner/config'? "bg-primary text-white border-0":" brute-border"}`} onClick={() => navigate('/partner/config')} >
            Configurações
          </button>
        </div>
      </div>
      <Outlet />
    </>
  )
}
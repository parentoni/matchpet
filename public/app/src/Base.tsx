import logo from './assets/logo.svg'
import reducedLogo from './assets/logo-reduced.svg'
import Hamburguer from './assets/hamburger.svg'
import { Outlet, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { SpeciesContext } from './utils/context/SpeciesContext'
import { AuthContext } from './utils/context/AuthContext'
import { FullPageModal } from './elements/FullPageModal'
import { PageLayout } from './PageLayout'
export const App = () => {

    const {user} = useContext(AuthContext)
    const [showNavigate, setShowNavigate] = useState(false)
    const navigate = useNavigate()
    return(
        <>
            <div className="w-full flex justify-between px-8 py-6">
                <img src={logo} width={70} alt='Matchpet logo' className=' cursor-pointer' onClick={() => navigate('/')}></img>
                <button onClick={() => setShowNavigate(true)}>
                    <img src={Hamburguer} alt='Menu' width={42}></img> 
                </button>
            </div>
            <Outlet />
            <FullPageModal title='NAVEGAR' isOpen={showNavigate} setIsOpen={setShowNavigate} absolute={false}>
                <PageLayout>
                    {user?
                    <div className='flex flex-col gap-3'>
                        <button onClick={() => {navigate('/partner')}} className='w-full bg-black text-white h-12'>
                            Gerenciar
                        </button>
                        <p className='text-sm'>Gerencie os seus animais para adoção.</p>

                    </div>
                        :
                        <div className='flex flex-col gap-3'>
                            <button onClick={() => {navigate('/auth/login')}} className='w-full bg-black text-white h-12'>
                                Entrar
                            </button>
                            <p className='text-sm'>Entre em sua conta para disponibilizar animais para adoção.</p>
                        </div>}
                    
                    <div className='w-full border my-5'></div>
                    <div className='flex flex-col gap-3'>
                        <button className='flex gap-3 items-center' onClick={() => {navigate(`/select?to=${window.location.pathname}`);setShowNavigate(false)}}>
                            <img alt='Match' src={reducedLogo} className='w-8'></img>
                            <p>Mudar espécie selecionada</p>
                        </button>
                    </div>
                </PageLayout>
                
            </FullPageModal>
        </>
    )
}
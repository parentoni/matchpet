import logo from './assets/logo.svg'
import reducedLogo from './assets/logo-reduced.svg'
import Hamburguer from './assets/hamburger.svg'
import { Outlet, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { SpeciesContext } from './utils/context/SpeciesContext'
import { AuthContext } from './utils/context/AuthContext'
import { FullPageModal } from './elements/FullPageModal'
import { PageLayout } from './PageLayout'
import { Footer } from './elements/app/Footer'
import { LocationContext } from './utils/context/LocationContext'
export const App = () => {

  const [showNavigate, setShowNavigate] = useState(false)
  const navigate = useNavigate()
  return(
    <>
      <div className='min-h-screen'>
        <div className="w-full max-w-7xl mx-auto flex justify-between px-8 py-6">
          
          <img src={logo} width={70} alt='Matchpet logo' className=' cursor-pointer' onClick={() => navigate('/')}></img>
          <button onClick={() => setShowNavigate(true)}>
            <img src={Hamburguer} alt='Menu' width={42}></img> 
          </button>
        </div>
        <Outlet />
        <AppMenuModal showNavigate={showNavigate} setShowNavigate={setShowNavigate}/>

      </div>
      <Footer />
    </>
  )
}

// Modal component
export const AppMenuModal = ({showNavigate, setShowNavigate}: {showNavigate: boolean, setShowNavigate: (x: boolean) => void}) => {

  // Contexts
  const {user} = useContext(AuthContext)
  const {species, preferredSpecie } = useContext(SpeciesContext)
  const {ibgeId} = useContext(LocationContext)
  // State
  const navigate = useNavigate()

  return (
    <FullPageModal title='NAVEGAR' isOpen={showNavigate} setIsOpen={setShowNavigate} absolute={false}>
      <PageLayout>
        {user?
          <div className='flex flex-col gap-3'>
            <button onClick={() => {navigate('/partner')}} className='w-full rounded bg-primary text-white h-12'>
              Gerenciar
            </button>
            <p className='text-sm'>Gerencie os seus animais para adoção.</p>

          </div>
          :
          <div className='flex flex-col gap-3'>
            <button onClick={() => {navigate('/auth/login')}} className='w-full rounded bg-primary text-white h-12'>
              Entrar
            </button>
            <p className='text-sm'>Entre em sua conta para disponibilizar animais para adoção.</p>
          </div>}

        <div className='w-full border my-5'></div>
        <div className='flex flex-col gap-5'>
          <button className='flex gap-3 items-center' onClick={() => {navigate('/');setShowNavigate(false)}}>
            <img alt='Match' src={reducedLogo} className='w-8'></img>
            <p>Tela incial</p>
          </button>
          <div className='dividier border-b'></div>
          <button className='flex gap-3 items-center' onClick={() => {navigate(`/select?to=${window.location.pathname}`);setShowNavigate(false)}}>
            <img alt='Match' src={reducedLogo} className='w-8'></img>
            <p>Mudar espécie selecionada ({species.find(x => x._id === preferredSpecie)?.name || 'nenhuma'})</p>
          </button>
          <div className='dividier border-b'></div>
          <button className='flex gap-3 items-center' onClick={() => {navigate('/regions'); setShowNavigate(false)}}>
            <img alt='Match' src={reducedLogo} className='w-8'></img>
            <p>Mudar região de busca selecionada ({ibgeId()!.nome})</p>
          </button>
          <div className='dividier border-b'></div>
          <button className='flex gap-3 items-center' onClick={() => {navigate('/animals');setShowNavigate(false)}}>
            <img alt='Match' src={reducedLogo} className='w-8'></img>
            <p>Ver animais para adoção</p>
          </button>
          
        </div>
      </PageLayout>

    </FullPageModal>
  )
}

import logo from './assets/logo.svg'
import Hamburguer from './assets/hamburger.svg'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { SpeciesContext } from './utils/context/SpeciesContext'
export const App = () => {
    const {species} = useContext(SpeciesContext)

    return(
        <>
            <div className="w-full flex justify-between px-8 pt-6">
                <img src={logo} width={70} alt='Matchpet logo'></img>
                <button>
                    <img src={Hamburguer} alt='Menu' width={42}></img> 
                </button>
            </div>
            <Outlet />
        </>
    )
}
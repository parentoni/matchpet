import logo from '../assets/logo.svg'
import {Menu} from 'lucide-react'
import Hamburguer from '../assets/hamburger.svg'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { SpeciesContext } from '../utils/context/SpeciesContex'
export const App = () => {
    const {species} = useContext(SpeciesContext)

    return(
        <>
            <div className="w-full flex justify-between px-8 pt-6">
                <h1 className='text-xl'>LOGO</h1>
                <img src={Hamburguer} alt='Menu' width={42}></img>
            </div>
            <Outlet />
        </>
    )
}
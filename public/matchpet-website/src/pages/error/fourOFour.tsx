import NaoCompre from '../../assets/nao_compre.svg'
import missPng from '../../assets/miss.jpeg'
import { useNavigate } from 'react-router-dom'
export const FourOFour = () => {
  const navigate = useNavigate()
  return(
    <div className="py-8 px-14 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm">
        <div className='w-full flex justify-center'>
          <img alt='MatchpetLogo' src={NaoCompre}></img>
        </div>
        <div className='mt-10'>
          <h2 className='text-xl font-semibold'>Ops...</h2>
          <p className='font-semibold'>Parece que você se perdeu. 404</p>
        </div>
        <button className='w-full bg-black mt-10 py-2 text-white' onClick={() => navigate('/')}>
          Tela de inicio
        </button>

        <img alt='Gato perdido ' className='mt-10' src={missPng}></img>

      </div>
      
    </div>
  )
}
import { Database } from 'lucide-react'
import Logo from '../../assets/logo.svg'
export const Testing = () => {
  return (
  <aside className="w-[300px] h-screen fixed border-r overflow-y-scroll no-scrollbar flex flex-col p-8 gap-3">
    <div className='w-full h-[100px]'>  
      <img src={Logo} className=' w-[100px]' alt='Matchpet Logo'></img>
    </div>
    <div className='flex-1 flex flex-col gap-6'>
      <div className='flex gap-5'>
        <Database /> Meus animais
      </div>
      <div className='flex gap-5'>
        <Database /> Projetos
      </div>
      <div className='flex gap-5'>
        <Database /> Time
      </div>
      <div className='flex gap-5'>
        <Database /> Tarefas
      </div>
    </div>
  </aside>
  )
}
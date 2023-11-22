import { GithubIcon, Instagram } from "lucide-react"
import { PageLayout } from "../../PageLayout"
import catLogo from '../../assets/logo-reduced.svg'
import { useGetStats } from "../../elements/hero/useGetStats"
import { useGetActiveUsers } from "../../elements/hero/useGetActiveUsers"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { SpeciesContext } from "../../utils/context/SpeciesContext"
export function HeroPage  ()  {

  const stats = useGetStats()
  const users = useGetActiveUsers()

  const navigate = useNavigate()

  const {preferredSpecie} = useContext(SpeciesContext)
  return (
    <div>
      <div className="w-full border-b "></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 md:mt-56">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"><span className="text-primary">Adoção</span>, sem dor de cabeça.</h1>
          <p className="mt-6 text-xl text-neutral-600">Veja todos os animais para adoção em Belo Horizonte e região de forma simples, rápida e unificada, para dessa forma encontrar o animal que seja o seu match! <span className="text-primary">Não compre, adote!</span></p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-5">
            
            <button className="w-60 h-12 rounded bg-primary flex items-center justify-center text-white" onClick={() => preferredSpecie?navigate('/animals'):navigate('/select?to=' + encodeURI('/animals'))}>
              Quero adotar
            </button>
            <button className="w-60 h-12 rounded brute-border flex justify-center items-center">
              Quero doar
            </button>
          </div>

        </div>

      
      </div>

      <HeroPageSection>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">

            <h2 className="text-4xl font-medium text-white">Projetos parceiros</h2>
              <ul  className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">

                {users.length > 0? users.slice(0,6).map(u => {return(
                  <button className="flex w-full h-full flex-row gap-2 line-clamp-1" onClick={() => navigate(`/organizations/${u.username}`)}>
                    <img src={catLogo} className="w-[35px]" alt="Logo matchpet"></img>
                    <p className="line-clamp-1 text-white">{u.display_name}</p>
                </button>
                )}):''}

                {[...Array(8-users.length).keys()].map(i => <p className="line-clamp-1 text-white">..........</p>)}
                
                
              </ul>
          </div>
        </div>
          
      </HeroPageSection>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 lg:mt-40">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="max-w-2xl">
            <h1 className=" block  tracking-tight [text-wrap:balance] text-4xl font-medium sm:text-5xl text-neutral-950 ">Não compre, <span className="text-primary">adote</span>!</h1>
          </div>
        </div>
        <p className="mt-6 text-xl text-neutral-600">Belo horizonte possui <a className="text-primary underline" href="https://www.otempo.com.br/cidades/belo-horizonte-tem-populacao-de-48-mil-animais-de-rua-1.2857246" target="#">48 mil animais de rua</a>. O objetivo do <b>MatchPet</b> é, por meio da tecnologia, reduzir esses números, impulsionando a adoção e dando uma vida digna a esses animais.</p>
      </div>


      <HeroPageSection>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-4xl font-medium text-white">Estatísticas</h2>
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:gap-20">
              <div>
                <p className="text-[80px]  [line-height:84px] font-medium tracking-tight text-white">{stats?.in_adoption || '---'}</p>
                <p className="text-white  text-lg">Animais em adoção</p>
              </div>
              <div>
                <p className="text-[80px]  [line-height:84px] font-medium tracking-tight text-white">{stats?.completed_adoptions || '---'}</p>
                <p className="text-white  text-lg">Animais adotados</p>
              </div>
            </div>
          </div>
        </div>
          
      </HeroPageSection>
   
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8 sm:mt-12 lg:mt-16 my-6">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="w-full flex items-center">
            <div className="flex-1">
              <p className="text-xs font-medium">Arthur Parentoni Guimarães, 2023</p>
              <a  className='text-xs' href="mailto:parentoni.arthur@gmail.com">&lt;parentoni.arthur@gmai.com&gt;</a>
            </div>
            <div className="flex gap-5">
              <a target="#" href="https://www.instagram.com/matchpetorg/"><Instagram size={28}/></a>
              <a target="#" href="https://github.com/parentoni/matchpet"><GithubIcon  size={28}/></a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export function HeroPageSection ({children}: React.PropsWithChildren<{}>) {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <section className="mt-24 rounded-[2rem] bg-primary py-20 sm:mt-32 sm:py-32 lg:mt-56">
        {children}
      </section>
    </div>
  )
}
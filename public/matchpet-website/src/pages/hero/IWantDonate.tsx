import { useNavigate } from "react-router-dom"

export const IWantDonate = () => {

  const navigate = useNavigate()

  return (<div>
     <div className="w-full border-b "></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 md:mt-56">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"><span className="text-primary">Parabéns</span>, você está mudando a vida de um animal.</h1>
          <p className="mt-6 text-xl text-neutral-600">Para começar a doar, crie a sua conta <b>Matchpet</b>.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-5">
            <button className="w-60 h-12 rounded bg-primary flex items-center justify-center text-white" onClick={() => navigate('/auth/register')}>
              Criar conta
            </button>
          </div>
        </div>
      </div>
  </div>)
}
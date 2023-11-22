import { useNavigate, useSearchParams } from "react-router-dom"

export const Thanks = () => {

  const [params, _] = useSearchParams()
  const navigate = useNavigate()
  return (
  <>
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 md:mt-56">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl"><span className="text-primary">Obrigado</span> por se cadastrar.</h1>
        <p className="mt-6 text-xl text-neutral-600">Um link de verificação foi enviado ao email <span className="text-primary">{params.get('email')}</span>. Verifique a sua conta para começar a doar animais.</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-5">
            
            <button className="w-60 h-10 rounded text-white bg-primary flex items-center justify-center " onClick={() => navigate('')}>
              Tela de início
            </button>
          </div>
      </div>

    </div>
  </>)
}
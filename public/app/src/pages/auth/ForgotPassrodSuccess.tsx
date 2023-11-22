import { useNavigate } from "react-router-dom"

export const ForgotPasswordSuccess = () => {

  const navigate = useNavigate()
  return (
  <>
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32 md:mt-56">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">Verifique o seu email.</h1>
        <p className="mt-6 text-xl text-neutral-600">Um email foi lhe enviado contendo instruções para a redefinição de senha.</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-5">
            
            <button className="w-60 h-10 rounded text-white bg-primary flex items-center justify-center " onClick={() => navigate('/')}>
              Tela de início
            </button>
          </div>
      </div>

    </div>
  </>)
}
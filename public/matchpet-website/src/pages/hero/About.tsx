import { Linkedin } from "lucide-react"

/**
 * About page
 */
export const About = () => {
  return(
    <main className="text-text pt-16 border-t">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex flex-col gap-2">
          <h2 className="">Sobre o <span className="text-primary">MatchPet</span></h2>
          <h1 className="text-[3rem] leading-tight font-medium ">Conectando adoções.</h1>
        </div>

        <div className="my-8 md:my-12 flex flex-col gap-4">
          {/* Our mission */}
          <p className="font-medium">
            O MatchPet é um Website que tem como intuito trazer maior visibilidade às adoções de animais no Brasil, por meio de um sistema simples, ágil e moderno. Também é um objetivo do sistema facilitar o gerenciamento de abrigos e ONGs de animais, por meio da automatização de tarefas e co-divulgação dos animais disponíveis. Atualmente, temos animais disponíveis em BH e região metropolitana. Não compre, adote!
          </p>

          {/* Our story*/}
          <p>
            O sistema surgiu em 2023, quando Arthur Parentoni, então com 15 anos, percebeu a grande ineficiencia do sistema de adoção brasileiro: As divulgações ocorriam primariamenente no Facebook, de forma que não existia uma forma centralizada e organizada de procurar por animais. Vendo isso, entrou em contato com ONGs parceiras e desenvolveu o MatchPet.
          </p>
        </div>

      </div>
      {/* Our values */}
      <div className="mx-auto max-w-7xl">
        <section className="w-full px-4 rounded-[2.5rem] bg-primary py-8">
          <h3 className="text-neutral-100 text-[2rem] ">Nossos valores</h3>
          <div className="flex flex-col gap-8 mt-8">
            <Value title="Amor aos animais" description="Para nós, um animal é um ser que, como todos os outros, deve ser respeitado e cuidado." />
            <Value title="Agilidade" description="Fornecer rapidamente uma residência digna aos animais de rua é nossa principal missão." />
            <Value title="Inovação" description="No MatchPet, acreditamos que a inovação é o motor de uma melhor sociedade." />
          </div>
        </section>
      </div>

      {/* Our team */}
      <div className="px-4 my-8 md:my-12 mx-auto max-w-7xl">
        <h3 className="text-[2rem]">Nosso time</h3>

        <div className="flex flex-col mt-8 gap-8">
          {/* EPP */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-xl font-medium">Arthur Parentoni</p>
              <a href="https://www.linkedin.com/in/arthur-parentoni-375b66254/" target={"_blank"} rel="noreferrer">
                <Linkedin size={20} strokeWidth={1}/>
              </a>
            </div>
            <p className="leading-tight">Presidente e fundador do MatchPet, estudante no CSA-NL.</p>
          </div>

          {/* KITA */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-xl font-medium">Henrique Kitayama</p>
              <a href="https://www.linkedin.com/in/henrique-kitayama-52134b2b8/" target={"_blank"} rel="noreferrer">
                <Linkedin size={20} strokeWidth={1}/>
              </a>
            </div>
            <p className="leading-tight">Vice-presidente do MatchPet, estudante no CSA-NL</p>
          </div>
          {/* Ju siste */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-xl font-medium">Julia Siste</p>
              <a href="https://www.linkedin.com/in/julia-vianna-siste-0b4140300/" target={"_blank"} rel="noreferrer">
                <Linkedin size={20} strokeWidth={1}/>
              </a>
            </div>
            <p className="leading-tight">Responsável pelas redes sociais.</p>
          </div>

        </div>
      </div>
    </main>)
}

export type ValueProps = {
  title: string,
  description: string
}

/**
 * A value of the organization
 */
export const Value = (props: ValueProps) => {
  return (
    <div className="div flex flex-col">
      <h4 className="text-xl font-medium text-neutral-100 leading-tight">{props.title}</h4>
      <p className="text-white">{props.description}</p>
    </div>
  )
}

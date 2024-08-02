import { Facebook, Github, Instagram } from "lucide-react"
import { useNavigate } from "react-router-dom"

/**
 * Footer component of non-partner pages 
 */
export const Footer = () => {
  return (
    <footer className="mt-16 w-full bg-neutral px-4 md:px-8 py-2 md:py-4">
      <div className="mx-auto max-w-7xl">

        {/* Footer social media*/}
        <div className="w-full h-16 border-border border-b flex items-center gap-4">
          <p className="text-text">Nos acompanhe:</p>

          {/* Instagram */}
          <a href="https://www.instagram.com/matchpetorg/" target="_blank" rel="noreferrer">
            <Instagram size={20} />
          </a>


          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=61555744561249" target="_blank" rel="noreferrer">
            <Facebook size={20} />
          </a>

          {/* Github */}
          <a href="https://github.com/parentoni/matchpet" target="_blank" rel="noreferrer">
            <Github size={20} />
          </a>
        </div>

        {/* Important links */}
        <div className="w-full py-4 gap-2 flex flex-col md:flex-row border-b border-border">
          <FooterLinkGroups name="Institucional" links={[
            {name: "Sobre", href: "/about"},
          ]}/>

          <FooterLinkGroups name="Links importantes" links={[
            {name: "Tela inicial", href: "/"},
            {name: "Ver todos animais", href: "/animals"},
            {name: "Selecionar preferência de animais", href: "/select?to=/animals"},
            {name: "Selecionar região de busca", href: "/regions"},
            {name: "Entrar", href: "/auth/login"},
            {name: "Cadastrar", href: "/auth/register"}
          ]}/>
        </div>

        {/* Contact */}
        <div className="w-full h-8 flex flex-col text-sm justify-center my-4">
          <p className="text-text font-semibold">Arthur Parentoni & Contribuidores, {new Date().getFullYear()}</p>
          <a href="mailto:parentoni.arthur@gmail.com">&lt;parentoni.arthur@gmail.com&gt;</a>
        </div>
      </div>
    </footer>

  )
}

export type FooterLinkGroupProps = {
  name: string,
  links: {name: string, href: string}[]
}
/**
 * Defines a group of important links in the footer.
 * */
export const FooterLinkGroups = (props: FooterLinkGroupProps) => {

  const navigate = useNavigate()

  // Enforce scroll to top
  const onClick = (href:string) => {
    window.scrollTo(0,0)
    navigate(href)

  }

  return (
  <div className="w-full flex flex-col">
    <div className="h-8 flex items-center">
      <p className="text-text font-semibold">{props.name}</p>
    </div>
     {props.links.map((link, index) => (
        <div className="h-6 flex items-center">
          <button className="text-neutral-text" onClick={() => onClick(link.href)}>{link.name}</button>
        </div>
     ))}
  </div>
  )
}


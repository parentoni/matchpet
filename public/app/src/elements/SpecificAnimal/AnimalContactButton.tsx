import { useState } from "react"
import { FullPageModal } from "../FullPageModal"
import naoCompre from '../../assets/nao_compre.svg'
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO"
import { Animal, SEX } from "../../utils/domain/Animal"

export type AnimalContactProps = {
  animal: IAnimalDTO
}
export function AnimalContactButton (props: AnimalContactProps) {
  
  const [isOpen, setIsOpen] = useState(false)

  const domainAnimal = Animal.create(props.animal)

  const sex = domainAnimal.getSex()
  const messageText = `${`Olá, vi ${sex === SEX.MALE?"o": "a"} *${props.animal.name}* no aplicativo *MATCHPET* e gostaria de adota-l${sex === SEX.MALE?"o":"a"}.`}`

  return(
    <>
      {/* <TransitionedModal isOpen={isOpen} setIsOpen={setIsOpen} panelStyle="w-full max-w-md transform overflow-hidden rounded-[10px] brute-border bg-white p-4 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-xl text-gray-900"
          >
          Adote {AnimalName}
        </Dialog.Title>
        <p className="text-sm">Entre em contato com os responsáveis do animal utilizando os seguintes métodos de contato:</p>
        <ContactButton text="WHATSAPP" Icon={<BsWhatsapp className="w-[30px] h-[30px]" preserveAspectRatio="xMidYMid meet"/>} link={`https://wa.me/${ContactDTO?.phone_number}?text=${messageTextWPP}`} />
        <ContactButton text="E-MAIL" Icon={<HiOutlineMail className="w-[30px] h-[30px]" preserveAspectRatio="xMidYMid meet"/>} link={`mailto:${ContactDTO?.email}?subject=${encodeURI(`Adoção de ${AnimalName}`)}&body=${encodeURI(messageTextEmail)}`}/>
      </TransitionedModal> */}
              
      <FullPageModal title="ADOTAR" isOpen={isOpen} setIsOpen={setIsOpen} absolute={false}>
        <div className="px-8 pt-4">
          <h2 className="text-2xl">Adote {props.animal.name}!</h2>
          <p className="text-sm">Entre em contato com os responsáveis de {props.animal.name} pelos seguintes métodos de contato:</p>
          <ContactButton color="#000000" textColor="#ffffff" text="WHATSAPP" link={`https://wa.me/${props.animal.contact.find(a => a.contact_type === "WHATSAPP")?.contact_value}?text=${messageText}`} />
          {props.animal.contact.find(a => a.contact_type === "EMAIL") &&
          <ContactButton textColor="#000000" color="#ffffff" text="E-MAIL" link={`mailto:${props.animal.contact.find(a => a.contact_type === "EMAIL")}?subject=${encodeURI(`Adoção de ${props.animal.name}`)}&body=${encodeURI(messageText)}`}/>
          }
          <div className="w-full justify-center flex">
            <img src={naoCompre} className="mt-4 w-4/5" alt="Não compre, adote"></img>
          </div>
        </div>
      </FullPageModal>
        
      <div className="px-8 pt-2">
        <button className="w-full h-12 text-white rounded  bg-primary flex justify-center items-center cursor-pointer shadow" onClick={() => setIsOpen(!isOpen)}>
          CONTATO
        </button>
      </div>
    </>
    )
}

export function ContactButton ({text,  link, color, textColor}: {text:string,  link: string, color:string, textColor: string}) {
  return (
    <a className="w-full h-12  mt-4 brute-border flex items-center px-3 gap-3 justify-center" href={link} style={{background: color}}>
      <h3 className="" style={{color: textColor}}>{text}</h3>
    </a>
  )
}

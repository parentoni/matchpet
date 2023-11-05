import { Dialog } from "@headlessui/react"
import { useNavigate } from "react-router-dom"

export interface SaveAnimalStateModalProps {
  percentage: number,
  message: string,
  open: boolean,
  setIsOpen: (x:boolean) => void
}

export const SaveAnimalStateModal = (props: SaveAnimalStateModalProps) => {
  console.log(props.percentage * 100)
  const navigate = useNavigate()
  return (
    <Dialog open={props.open} onClose={() => {}} >
       <div className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <Dialog.Panel className={'w-full max-w-xl brute-border bg-white p-5'}>
              {props.percentage < 1 ? 
              <>
              <Dialog.Title className={'font-medium'}>Salvando mudanças. Por favor, não feche essa página...</Dialog.Title>
              <p className="mt-4 text-sm">{props.message}</p>
              <div className="my-4 w-full bg-gray-300 h-2">
                <div className={`h-full bg-primary`} style={{width: `${props.percentage * 100}%`}}></div>
              </div>
              </>
              :<>
              <Dialog.Title className={'font-medium'}>Mudanças salvas com sucesso.</Dialog.Title>
              <div className="w-full mt-5 flex justify-end gap-5">
                <button className="w-40 h-10 brute-border" onClick={() => navigate('/partner/animal/new')}> Criar nova adoção</button>
                <button className="w-40 h-10  bg-black text-white" onClick={() => navigate('/partner')}> Voltar</button>
              </div>
              </>}
            </Dialog.Panel>
          </div>
        </div>
    </Dialog>
  )
}
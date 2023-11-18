
import { Info } from "lucide-react"

export interface RegisterTextInputProps {
  title: string;
  placeholder:string;
  type: React.HTMLInputTypeAttribute
  tooltip?:string;
  inputMode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
}
export function RegisterTextInput (props: RegisterTextInputProps) {


  return(
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 items-center text-base">
        <label className="font-medium">{props.title}</label>
        
      </div>
      <div className="flex w-full h-12">

        <input type={props.type} inputMode={props.inputMode} className={`w-full h-12 p-2 brute-border  focus:outline-0 outline-black rounded-none font-normal text-lg ${props.tooltip?"border-r-0":""}`} placeholder={props.placeholder} ></input>
        {props.tooltip && 

          <button className={'h-full aspect-square flex brute-border border-l-0 items-center justify-center'} onClick={() => alert(props.tooltip)}>
            <Info size={20} />
          </button>

          
        }
      </div>

    </div>
  )
}

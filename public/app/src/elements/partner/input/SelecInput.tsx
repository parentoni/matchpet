import { RadioGroup } from "@headlessui/react"

export interface SpecieInputProps<T> {
  array: T[],
  state: T | undefined,
  setState: (x: T) => void,
  option: (x: T ) => string,
  title: string,
  checked: (x: T | undefined) => boolean,
  optional?: {
    text:string
  },
  errorMessage?:string,
  obrigatory?: boolean
}

export function SelectInput<T>(props: SpecieInputProps<T>) {

  // const [state, setState] = useState
  return (
    <RadioGroup  value={props.state} onChange={props.setState} >
      <RadioGroup.Label className={'text-sm'}>{props.title}  {props.obrigatory? <span className="text-primary">*</span>:''}</RadioGroup.Label>
      <div className="flex gap-2 mt-2 overflow-x-scroll no-scrollbar">
        {props.optional && 
        <RadioGroup.Option value={undefined}>
          <button type="button" className={`cursor-pointer px-4 text-xs py-1 brute-border rounded-full flex items-center justify-center  whitespace-nowrap  ${props.checked(undefined)? "bg-black text-white": ""}`}>{props.optional.text}</button>
        </RadioGroup.Option>}

        {props.array.map(s => 
          <RadioGroup.Option value={s} >
            {({checked, active}) => {
              return (
                <button type="button" className={`cursor-pointer h-8 px-2 text-xs py-1 border rounded flex items-center justify-center  whitespace-nowrap  ${props.checked(s)? "bg-primary bg-opacity-10 text-primary border-primary": " bg-neutral-50 "}`}>{props.option(s)}</button>
              )
            }

            }
          </RadioGroup.Option>
        
        )}
        
      </div>
      {props.errorMessage && <span className="text-sm text-error">{props.errorMessage}</span>}
    </RadioGroup>
  )
}
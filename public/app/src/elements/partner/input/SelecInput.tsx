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
  errorMessage?:string
}

export function SelectInput<T>(props: SpecieInputProps<T>) {

  // const [state, setState] = useState
  return (
    <RadioGroup  value={props.state} onChange={props.setState}>
      <RadioGroup.Label className={'font-medium'}>{props.title}</RadioGroup.Label>
      <div className="flex gap-2 mt-2 overflow-x-scroll no-scrollbar">
        {props.optional && 
        <RadioGroup.Option value={undefined}>
          <button className={`cursor-pointer px-4 text-xs py-1 brute-border rounded-full flex items-center justify-center  whitespace-nowrap  ${props.checked(undefined)? "bg-black text-white": ""}`}>{props.optional.text}</button>
        </RadioGroup.Option>}

        {props.array.map(s => 
          <RadioGroup.Option value={s} >
            {({checked, active}) => {
              return (
                <button className={`cursor-pointer px-4 text-xs py-1 brute-border rounded-full flex items-center justify-center  whitespace-nowrap  ${props.checked(s)? "bg-black text-white": ""}`}>{props.option(s)}</button>
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
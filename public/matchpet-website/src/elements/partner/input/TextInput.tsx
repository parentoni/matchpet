

export interface TextInputProps {
  state: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
  title: string,
  errorMessage?: string,
  subElement?: React.ReactNode,
  placeholder: string,
  obrigatory?: boolean
}


export const TextInput = (props: TextInputProps) => {
  return (
    <div className="flex flex-col w-[min(100%,37rem)]">
      <label htmlFor={props.title} className={`mb-2 text-sm  ${props.errorMessage ? "text-error" : ""}`}>{props.title} {props.obrigatory? <span className="text-primary">*</span>:''}</label>
      <input value={props.state} placeholder={props.placeholder} id={props.title}  onChange={props.onChange} className={`rounded w-full bg-neutral-50 h-8  text-xs border p-2 ${props.errorMessage ? "border-error  placeholder-error" : "border-gray-300"}`}></input>
      <div className="flex items-center">
        {props.errorMessage ? <span className="text-sm text-error">{props.errorMessage}</span> : ''}
        <div className=" ml-auto">{props.subElement}</div>
      </div>
    </div>
  );
};

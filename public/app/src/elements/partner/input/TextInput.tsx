

export interface TextInputProps {
  state: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
  title: string,
  errorMessage?: string,
  subElement?: React.ReactNode,
  placeholder: string
}


export const TextInput = (props: TextInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.title} className={`font-medium  ${props.errorMessage ? "text-error" : ""}`}>{props.title}</label>
      <input value={props.state} placeholder={props.placeholder} id={props.title}  onChange={props.onChange} className={`border-gray-300 w-50 border p-2 ${props.errorMessage ? "border-error text-error" : ""}`}></input>
      <div className="flex items-center">
        {props.errorMessage ? <span className="text-sm text-error">{props.errorMessage}</span> : ''}
        <div className=" ml-auto">{props.subElement}</div>
      </div>
    </div>
  );
};

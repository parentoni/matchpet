
export interface NumberInputProps {
  state: number,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
  title: string,
  errorMessage?: string,
  subElement?: React.ReactNode,
}

export const NumberInput = (props: NumberInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.title} className={`font-medium  ${props.errorMessage ? "text-error" : ""}`}>{props.title}</label>
      <input value={props.state} id={props.title} type="number"  onChange={props.onChange} className={`border-gray-300 w-50 border p-2 ${props.errorMessage ? "border-error text-error" : ""}`}></input>
      <div className="flex items-center">
        {props.errorMessage ? <span className="text-sm text-error">{props.errorMessage}</span> : ''}
        <div className=" ml-auto">{props.subElement}</div>
      </div>
    </div>
  );
};

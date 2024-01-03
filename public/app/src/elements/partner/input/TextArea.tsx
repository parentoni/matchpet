
export interface TextAreaProps {
  state: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any,
  title: string,
  errorMessage?: string,
  subElement?: React.ReactNode,
  placeholder: string,
  obrigatory?: boolean,
}

export const TextArea = (props: TextAreaProps) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={props.title} className={`mb-2 text-sm  ${props.errorMessage ? "text-error" : ""}`}>{props.title}  {props.obrigatory? <span className="text-primary">*</span>:''}</label>
      <textarea value={props.state} placeholder={props.placeholder} id={props.title}  onChange={props.onChange} className={` px-2 py-2 text-xs  bg-neutral-50  w-full border h-16 rounded  ${props.errorMessage ? "border-error  placeholder-error" : " border-gray-300"}`}></textarea>
      <div className="flex items-center">
        {props.errorMessage ? <span className="text-sm text-error">{props.errorMessage}</span> : ''}
        <div className=" ml-auto">{props.subElement}</div>
      </div>
    </div>
  );
};

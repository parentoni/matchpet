
export interface TextAreaProps {
  state: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any,
  title: string,
  errorMessage?: string,
  subElement?: React.ReactNode,
  placeholder: string
}

export const TextArea = (props: TextAreaProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.title} className={`font-medium  ${props.errorMessage ? "text-error" : ""}`}>{props.title}</label>
      <textarea value={props.state} placeholder={props.placeholder} id={props.title}  onChange={props.onChange} className={` w-50 border p-2 rounded  ${props.errorMessage ? "border-error  placeholder-error" : " border-gray-300"}`}></textarea>
      <div className="flex items-center">
        {props.errorMessage ? <span className="text-sm text-error">{props.errorMessage}</span> : ''}
        <div className=" ml-auto">{props.subElement}</div>
      </div>
    </div>
  );
};

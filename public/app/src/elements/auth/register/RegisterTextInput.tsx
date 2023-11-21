
import { Info } from "lucide-react"
import React, { Ref, useContext, useRef } from "react";
import { Form } from "./Form";
import { RegisterContext } from "./RegisterRoot";

export interface RegisterTextInputProps {
  title: string;
  placeholder:string;
  type: React.HTMLInputTypeAttribute
  tooltip?: JSX.Element;
  inputMode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
  formName:string,
  innerRef?:Ref<HTMLInputElement>
}
export function RegisterTextInput (props: RegisterTextInputProps) {

  const {form, setForm} = useContext(RegisterContext)

  const onChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    form[props.formName].variable = e.target.value
    setForm(structuredClone(form))
  }

  return(
    <div className="flex flex-col gap-1">
      <div className="flex gap-3 items-center text-base">
        <label className="font-medium">{props.title}</label>
      
      </div>
      <div className="flex w-full h-12 relative">

        <input
          autoComplete='off' 
          value={form[props.formName].variable}
          type={props.type}
          inputMode={props.inputMode}
          className={`w-full h-12 autofill:bg-primary autofill:text-white  pl-6 py-4 border  focus:border-neutral-600 rounded-md transition ring-transparent relative focus:outline-none focus:ring-primary/20 ring-4 outline-2  font-normal text-lg ${form[props.formName].hasError?"border-error  bg-error/5":"border-neutral-300"}`} 
          placeholder={props.placeholder} 
          onChange={onChange}
          ref={props.innerRef}
          ></input>

        {props.tooltip}

      </div>
    <span className="text-error text-sm">{form[props.formName].hasError?form[props.formName].errorMessage:""}</span>
    </div>
  )
}

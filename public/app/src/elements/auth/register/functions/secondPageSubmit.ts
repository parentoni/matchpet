import { Form, checkFormErrors } from "../Form"
import { userNameIsTaken } from "./checkUserNameAvailability"
const format = require('telefone/format')

export const secondPageSubmit = async (form:Form, setForm: (x: Form) => void,location:[number,number] | undefined, setLocationErrorMessage: (x:string | undefined) => void, setPage: (x:number) => void) => {
  let error = checkFormErrors(form, ['phone'])

  form['phone'].variable = format('+55 ' + form['phone'].variable)

  // console.log(parse(('+55 ' + form['phone'].variable)), '+55 ' + form['phone'].variable)
  
  if (!location || location.length !== 2) {
    error++
    setLocationErrorMessage("Por favor, informe uma localização válida.")
  } else {
    setLocationErrorMessage(undefined)
  }
  
  setForm(structuredClone(form))
  if (error === 0) {
    setPage(2)
  }
}
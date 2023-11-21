import { Form, checkFormErrors } from "../Form"
import { userNameIsTaken } from "./checkUserNameAvailability"

export const secondPageSubmit = async (form:Form, setForm: (x: Form) => void,location:[number,number] | undefined, setLocationErrorMessage: (x:string | undefined) => void, setPage: (x:number) => void) => {
  let error = checkFormErrors(form, ['phone'])



  setForm(structuredClone(form))

  if (!location || location.length !== 2) {
    error++
    setLocationErrorMessage("Por favor, informe uma localização válida.")
  } else {
    setLocationErrorMessage(undefined)
  }

  if (error === 0) {
    setPage(2)
  }
}
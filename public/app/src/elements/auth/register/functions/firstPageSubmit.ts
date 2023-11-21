import { Form, checkFormErrors } from "../Form"
import { userNameIsTaken } from "./checkUserNameAvailability"

export const firstPageSubmit = async (form:Form, setForm: (x: Form) => void, setPage: (x: number) => void) => {
  let error = checkFormErrors(form, ['display_name', 'username', "email",'password', 'confirm_password'])


  if (form['password'].variable !== form['confirm_password'].variable && !form['password'].hasError)   {
    error++
    form['confirm_password'].hasError = true
  } else {
    form['confirm_password'].hasError = false
    
  }

  if (!form['username'].hasError) {
    const taken = await userNameIsTaken(form['username'].variable)
    if (taken) {
      error++
      form['username'].errorMessage = "Nome de usuário já utilizado."
      form['username'].hasError = true
    } else {
      form['username'].errorMessage = "Por favor, digite um nome de usuário válido."
    }
  }
  
  setForm(structuredClone(form))
  if (error === 0) {
    setPage(1)
  }
}
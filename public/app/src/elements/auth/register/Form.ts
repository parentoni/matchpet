export type Form = Record<string, FormData>

export type FormData = {
  hasError?: boolean
  errorMessage: string,
  variable: any,
  regExp: RegExp
}

export const checkFormErrors = (form: Form): boolean => {
  let error = false
  for (const key of Object.keys(form)) {
    const value = form[key]
    if (!String(value.variable).match(value.regExp)) {
      error = true
      form[key].hasError = true
    } else {
      form[key].hasError = false
    }
  }

  return error
}
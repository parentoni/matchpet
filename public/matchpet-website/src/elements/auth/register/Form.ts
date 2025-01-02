export type Form = Record<string, FormData>

export type FormData = {
  hasError?: boolean
  errorMessage: string,
  variable: any,
  regExp: RegExp
}

export const checkFormErrors = (form: Form, keys: string[]): number => {
  let error = 0
  for (const key of keys) {
    const value = form[key]
    if (!String(value.variable).match(value.regExp)) {
      error++
      form[key].hasError = true
    } else {
      form[key].hasError = false
    }
  }

  return error
}
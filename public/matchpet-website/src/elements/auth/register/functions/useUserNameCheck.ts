import {useEffect, useState } from "react";
import { Form } from "../Form";
import { userNameIsTaken } from "./checkUserNameAvailability";

export const useUserNameCheck = (form: Form, setForm: (x: Form) => void, usernameRef: React.RefObject<HTMLInputElement>) => {

  const [usernameTaken, setUserNameTaken] = useState<boolean>(false)
  useEffect(() => {

    usernameRef.current?.addEventListener("focusout", async () => {
        // const taken = await userNameIsTaken(form['username'].variable)
        // if (taken) {
        //   setUserNameTaken(true)
        // } else {
        //   setUserNameTaken(false)
        // }


      })
    return (
      usernameRef.current?.removeEventListener('focusout', () => {})
    )
  }, [])

  return [usernameTaken]
}

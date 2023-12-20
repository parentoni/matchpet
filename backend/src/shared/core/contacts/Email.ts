import { UserEmail } from "../../../modules/user/domain/userProps/userEmail";
import { Contact, ContactProps } from "../Contact";
import { Guard, GuardError } from "../Guard";
import { Either, left, right } from "../Result";
import { WhatsApp } from "./Whatsapp";

export class Email extends Contact {
  protected CONTACT_TYPE = "EMAIL"


  public static validate (contactValue:string): Either<GuardError, string> {
    const guardResult = Guard.againstNullOrUndefined(contactValue, "CONTACT_VALUE")
    if (guardResult.isLeft()) {
      return left(guardResult.value)
    }

    const phoneResult = UserEmail.create({value: contactValue})

    if (phoneResult.isLeft()) {
      return left(phoneResult.value)
    }

    return right(phoneResult.value.value)
  }

  public static create(p: ContactProps): Either<GuardError, Email> {
    const validateResult = this.validate(p.contactValue)

    if (validateResult.isLeft()) {
      return left(validateResult.value)
    }

    return right(new Email({contactValue: p.contactValue}))
  }

  
}
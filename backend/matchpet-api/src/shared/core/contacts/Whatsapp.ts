import { UserPhone } from "../../../modules/user/domain/userProps/userPhone";
import { Contact, ContactProps } from "../Contact";
import { Guard, GuardError } from "../Guard";
import { Either, left, right } from "../Result";

export class WhatsApp extends Contact {
  protected CONTACT_TYPE = "WHATSAPP";

  public static validate(contactValue: string): Either<GuardError, string> {
    const guardResult = Guard.againstNullOrUndefined(contactValue, "CONTACT_VALUE");
    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    const phoneResult = UserPhone.create({ value: contactValue });

    if (phoneResult.isLeft()) {
      return left(phoneResult.value);
    }

    return right(phoneResult.value.value);
  }

  public static create(p: ContactProps): Either<GuardError, WhatsApp> {
    const validateResult = this.validate(p.contactValue);

    if (validateResult.isLeft()) {
      return left(validateResult.value);
    }

    return right(new WhatsApp({ contactValue: validateResult.value }));
  }
}

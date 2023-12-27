import { ValueObject } from "../domain/ValueObject";

export interface ContactProps {
  contactValue: string;
}

export abstract class Contact extends ValueObject<ContactProps> {
  protected abstract CONTACT_TYPE: string;

  get value(): ContactProps {
    return this.props;
  }

  get contactType(): string {
    return this.CONTACT_TYPE;
  }

  get contactValue(): string {
    return this.props.contactValue;
  }
}

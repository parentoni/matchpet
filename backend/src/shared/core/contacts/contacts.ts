import { WatchList } from "../../domain/WatchList";
import { IContactPersistent } from "../../infra/database/models/Animal";
import { Contact } from "../Contact";
import { Guard, GuardError } from "../Guard";
import { CommonUseCaseResult } from "../Response/UseCaseError";
import { Either, left, right } from "../Result";
import { Email } from "./Email";
import { WhatsApp } from "./Whatsapp";

export const contactTypeMapper = {
  "WHATSAPP": WhatsApp,
  "EMAIL": Email
}

export class Contacts extends WatchList<Contact>{
  
  constructor(array: Contact[]) {
    super(array)
  }

  compareItems(a: Contact, b: Contact): boolean {

    if (a.contactType === b.contactType) {
      return true
    }

    return false
  }
  
  public static create(array: Contact[]): Either<GuardError, Contacts> {
    const guard = Guard.againstEmpty(array, "ARRAY")
    if (guard.isLeft()) {
      return left(guard.value)
    }

    return right(new Contacts(array))
  }

  public static createFromPersistent(array: IContactPersistent[]): Either<GuardError, Contacts> {
    const domainArray: Contact[] = []

    const guard = Guard.againstEmpty(array, "ARRAY")
    if (guard.isLeft()) {
      return left(guard.value)
    }

    for (const element of array) {
      if (!Object.keys(contactTypeMapper).includes(element.contact_type)) {
        return left(CommonUseCaseResult.InvalidValue.create({
          errorMessage: `The contact type: ${element.contact_type} is invalid`,
          variable: "CONTACT_TYPE",
          location: `${Contacts.name}.${this.createFromPersistent.name}`
        }))
      }
      
      const result = contactTypeMapper[element.contact_type as keyof typeof contactTypeMapper].create({contactValue: element.contact_value})
      if (result.isRight() ) {
        domainArray.push(result.value)
      }

    }

    const contacts = this.create(domainArray)
    if (contacts.isLeft()) {
      return left(contacts.value)
    }

    return right(contacts.value)
  }

  public get persistentValue(): IContactPersistent[] {
    const arr: IContactPersistent[] = []
    for (const contact of this.list) {
      arr.push({
        contact_type: contact.contactType,
        contact_value: contact.contactValue,
      
      })
    } 

    return arr
  }


}
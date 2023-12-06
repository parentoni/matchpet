import { Guard } from "../../../../../shared/core/Guard";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { SendEmailUseCase } from "../../../../notifications/useCase/sendEmail/sendEmailUseCase";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { CreateAnimalComplaintDTO } from "./createAnimalComplaintDTO";
import { CreateAnimalComplaintResponse } from "./createAnimalComplaintResponse";

export class CreateAnimalComplaintUseCase implements UseCase<CreateAnimalComplaintDTO, CreateAnimalComplaintResponse> {

  private animalRepo: IAnimalRepo;
  private sendEmailUseCase: SendEmailUseCase;

  constructor (animalRepo: IAnimalRepo, sendEmailUseCase: SendEmailUseCase) {
    this.animalRepo = animalRepo
    this.sendEmailUseCase = sendEmailUseCase
  }
//todo: pass this to aggreagte root
  async execute(request: CreateAnimalComplaintDTO): Promise<CreateAnimalComplaintResponse> {

    const guardResponse = Guard.againstNullOrUndefined(request.complaint, "COMPLAINT_TXT")

    if (guardResponse.isLeft()) {
      return left(guardResponse.value)
    }

    if (request.contact_info) {
      const guardContact = Guard.againstNullOrUndefinedBulk([
        {argument: request.contact_info.name, argumentName: "CONTACT_NAME"},
        {argument: request.contact_info.phone, argumentName: "CONTACT_PHONE"}
      ])

      if (guardContact.isLeft()) {
        return left(guardContact.value)
      }
    }



    const repoResponse = await this.animalRepo.findById(request.animal_id)
    
    if (repoResponse.isLeft()) {
      return left(repoResponse.value)
    }


    const response = await this.sendEmailUseCase.execute({
      source: 'denuncias@matchpet.org',
      recepient: 'parentoni.arthur@gmail.com',
      html_body: `TXT: ${request.complaint}\n || ANIMAL: ${repoResponse.value.name.value} | ${repoResponse.value.id.toValue()} || CONTACT INFO: ${JSON.stringify(request.contact_info)}`,
      subject: "DENUNCIA MATCHPET"
    })
    console.log('oo')

    if (response.isLeft()) {
      return left(response.value)
    }
    
    return right('ok')
  }
}
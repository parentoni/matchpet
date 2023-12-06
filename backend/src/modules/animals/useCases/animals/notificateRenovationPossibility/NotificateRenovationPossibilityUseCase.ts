import ejs from "ejs";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { GetUserByUIDUseCase } from "../../../../user/useCases/getUserByUID/getUserByUIDUseCase";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { NotificateRenovationPossibilityResponse } from "./NotificateRenovationPossibilityResponse";
import { join } from "path";
import { Secrets } from "../../../../../config/secretsManager";
import { SendEmailUseCase } from "../../../../notifications/useCase/sendEmail/sendEmailUseCase";

export class NotificateRenovationPossibilityUseCase implements UseCase<void, NotificateRenovationPossibilityResponse> {
  
  private animalRepo: IAnimalRepo;
  private findUserByIdUseCase: GetUserByUIDUseCase;
  private sendEmailUseCase: SendEmailUseCase;
  private static DAYS_TO_NOTIFICATION = 10

  constructor (animalRepo: IAnimalRepo, findUserByIduseCase: GetUserByUIDUseCase, sendEmailUseCase: SendEmailUseCase) {
    this.animalRepo = animalRepo
    this.findUserByIdUseCase = findUserByIduseCase
    this.sendEmailUseCase = sendEmailUseCase
  }

  
  async execute(): Promise<NotificateRenovationPossibilityResponse> {

    const response = await this.animalRepo.aggregataCanRenovate(NotificateRenovationPossibilityUseCase.DAYS_TO_NOTIFICATION)
    
    if (response.isLeft()) {
      return left(response.value)
    }

    for (const user of response.value) {
      const uResponse = await this.findUserByIdUseCase.execute({uid: user._id})
      if (uResponse.isRight()){
        for (const animal of user.animals) {
          const file = await ejs.renderFile(join(__dirname + '../../../../../../../static/emails/ejs/animalCanBeRenovated.ejs'), {name: animal.name.value, link:  `${Secrets.getSecret('PUBLIC_APP_URL')}/partner`})
          await this.sendEmailUseCase.execute({
            recepient: uResponse.value.email,
            source: 'nao-responda@matchpet.org',
            html_body: file,
            subject: "Anúncio de animal pode ser renovado."
          })
        }
      }
    }

    return right(null)   
  }
}
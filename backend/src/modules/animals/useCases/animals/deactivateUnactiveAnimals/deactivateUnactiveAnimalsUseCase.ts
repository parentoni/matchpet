import ejs from "ejs";
import { left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { IUserRepo } from "../../../../user/repository/IUserRepo";
import { GetUserByUIDUseCase } from "../../../../user/useCases/getUserByUID/getUserByUIDUseCase";
import { UpdateUserStatsUseCase } from "../../../../user/useCases/updateUserStats/updateUserStatsUseCase";
import { ANIMAL_STATUS } from "../../../domain/animal/AnimalStatus";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";
import { DeactivateUnactiveAnimalsDTO } from "./deactivateUnactiveAnimalsDTO";
import { DeactivateAnimalsResponse } from "./deactivateUnactiveAnimalsResponse";
import { join } from "path";
import { Secrets } from "../../../../../config/secretsManager";
import { SendEmailUseCase } from "../../../../notifications/useCase/sendEmail/sendEmailUseCase";

export class DeactivateUnactiveAnimalsUseCase implements UseCase<DeactivateUnactiveAnimalsDTO, DeactivateAnimalsResponse> {
  
  protected getUserByUiduseCase: GetUserByUIDUseCase
  protected animalRepo: IAnimalRepo
  protected sendEmailuseCase: SendEmailUseCase
  static UNACTIVE_DAYS = 35

  constructor (getUserByUidUseCase: GetUserByUIDUseCase, animalRepo: IAnimalRepo, sendEmailUseCase: SendEmailUseCase) {
    this.getUserByUiduseCase = getUserByUidUseCase
    this.animalRepo = animalRepo
    this.sendEmailuseCase = sendEmailUseCase
  }

  async execute(request: DeactivateUnactiveAnimalsDTO): Promise<DeactivateAnimalsResponse> {
    const result = await this.animalRepo.countUnactive(request.date, DeactivateUnactiveAnimalsUseCase.UNACTIVE_DAYS)

    if (result.isLeft()) {
      return left(result.value)
    }

    const data = result.value

    for (const user of data) {
      const userResponse = await this.getUserByUiduseCase.execute({uid: user._id})
      if (userResponse.isRight()) {
        for (const animal of user.animals) {
          animal.animalChangeStatus(ANIMAL_STATUS.AUTO_CANCELED)
          const response = await this.animalRepo.save(animal)

          
        }

      const file = await ejs.renderFile(join(__dirname + '../../../../../../../static/emails/ejs/animalDeactivated.ejs'), { link: `${Secrets.getSecret('PUBLIC_APP_URL')}/partner`, animals: user.animals.map(a => a.name.value)})
      await this.sendEmailuseCase.execute({
        recepient: userResponse.value.email,
        source: 'nao-responda@matchpet.org',
        html_body: file,
        subject: "Anúncio de animal cancelado."
      })
      }
    }


    return right('ok')
  
  }
}
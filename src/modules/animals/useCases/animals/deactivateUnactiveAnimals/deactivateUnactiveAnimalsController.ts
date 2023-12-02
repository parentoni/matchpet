import { GuardError } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../../shared/core/Result";
import { CronController } from "../../../../../shared/infra/cron/models/CronController";
import { DeactivateUnactiveAnimalsUseCase } from "./deactivateUnactiveAnimalsUseCase";

export class DeactivateUnactiveAnimalsController extends CronController {

  readonly cronTime = '* 30 * * * * ' //0 13 * * *
  protected name = 'deactivateUnactiveAnimals'
  protected useCase: DeactivateUnactiveAnimalsUseCase

  constructor (useCase: DeactivateUnactiveAnimalsUseCase) {
    super();
    this.useCase = useCase
  }

  async execute(): Promise<Either<CommonUseCaseResult.UnexpectedError | GuardError, string>> {
    const date = new Date()

    const response = await this.useCase.execute({date: date})
    if (response.isLeft()){
      return left(response.value)
    }

    console.log(response.value)

    return right('ok')
  }
}
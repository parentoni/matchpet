import { GuardError } from "../../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../../shared/core/Result";
import { CronController } from "../../../../../shared/infra/cron/models/CronController";
import { NotificateRenovationPossibilityResponse } from "./NotificateRenovationPossibilityResponse";
import { NotificateRenovationPossibilityUseCase } from "./NotificateRenovationPossibilityUseCase";

export class NotificateRenovationPossibilityController extends CronController {
  cronTime = "0 0 13 * * *";
  protected name = "NotificateRenovationPossibility";

  private useCase: NotificateRenovationPossibilityUseCase;

  constructor(useCase: NotificateRenovationPossibilityUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(): Promise<NotificateRenovationPossibilityResponse> {
    const response = await this.useCase.execute();
    return response;
  }
}

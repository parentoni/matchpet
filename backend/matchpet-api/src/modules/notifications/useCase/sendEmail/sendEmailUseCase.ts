import { Guard } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { SendEmailDTO } from "./sendEmailDTO";
import { SendEmailResponse } from "./sendEmailResponse";
import { SESClient, SendEmailCommand, SendEmailCommandInput } from "@aws-sdk/client-ses";
export class SendEmailUseCase implements UseCase<SendEmailDTO, SendEmailResponse> {
  private client: SESClient;

  constructor(key: string, private_key: string) {
    this.client = new SESClient({
      region: "sa-east-1",
      credentials: {
        accessKeyId: key,
        secretAccessKey: private_key
      }
    });
  }

  async execute(request: SendEmailDTO): Promise<SendEmailResponse> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: request.recepient, argumentName: "RECEPIENT" },
      { argument: request.html_body, argumentName: "HTML_BODY" },
      { argument: request.source, argumentName: "SOURCE" },
      { argument: request.subject, argumentName: "SUBJECT" }
    ]);

    if (guardResult.isLeft()) {
      return left(guardResult.value);
    }

    if (request.source.split("@")[1] !== "matchpet.org") {
      return left(
        CommonUseCaseResult.InvalidValue.create({
          location: `${SendEmailUseCase.name}.${this.execute.name}`,
          variable: "SOURCE",
          errorMessage: "Source must be @matchpet.org."
        })
      );
    }

    const params: SendEmailCommandInput = {
      Destination: {
        ToAddresses: [request.recepient]
      },

      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: request.html_body
          }
        },
        Subject: {
          Charset: "UTF8",
          Data: request.subject
        }
      },
      Source: request.source
    };

    const command = new SendEmailCommand(params);

    try {
      const response = await this.client.send(command);

      return right(request.recepient);
    } catch (error) {
      return left(CommonUseCaseResult.UnexpectedError.create(error));
    }
  }
}

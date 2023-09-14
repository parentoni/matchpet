import { GuardError } from "../../../../shared/core/Guard";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";
import { GetUserInfoResponseDTO } from "./getUserInfoDTO";


export type GetUserInfoUseCaseResponse = Either<GuardError | CommonUseCaseResult.UnexpectedError, GetUserInfoResponseDTO>
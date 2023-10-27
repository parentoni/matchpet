import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";
import { Either } from "../../../../shared/core/Result";

//! this should be on his own subdomain
export interface IBucketUpload {
  upload(file: Buffer, location: string): Promise<Either<CommonUseCaseResult.UnexpectedError, string>>;
}

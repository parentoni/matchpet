import { CommonUseCaseResult } from "../../../shared/core/response/useCaseError";
import { Either } from "../../../shared/core/result";
import { Media } from "../domain/media";


/**
 * External media downloader response and props
 */
export type ExternalMediaManagerDownloadResponse = Promise<Either<CommonUseCaseResult.InvalidValue | CommonUseCaseResult.UnexpectedError, Media>>;
export type ExternalMediaManagerDownloadProps = {src: string};

/**
 * External media downloader.
 */
export interface IExternalMediaManager {
  download(props: ExternalMediaManagerDownloadProps): ExternalMediaManagerDownloadResponse;
}


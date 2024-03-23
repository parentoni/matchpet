import { UseCase } from "../../../../shared/core/UseCase";
import { IExternalMediaManager } from "../../services/IContentManager";
import { DownloadMediaDTO } from "./downloadMediaDTO";
import { DownloadMediaResponse } from "./downloadMediaResponse";

/**
 * @class DownloadImageUseCase
 * @classdesc Download image use case. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class DownloadMediaUseCase implements UseCase<DownloadMediaDTO, DownloadMediaResponse> {
  externalMediaManager: IExternalMediaManager;

  /**
   * Injects the external media manager.
   * @constructor
   * @param {IExternalMediaManager} externalMediaManager 
   */
  constructor(externalMediaManager: IExternalMediaManager) {
    this.externalMediaManager = externalMediaManager;
  }

  async execute(request: DownloadMediaDTO): Promise<DownloadMediaResponse> {
   
    // executes the download method from the external media manager.
    const response = await this.externalMediaManager.download({ src: request.src });
    return response;

  }
}

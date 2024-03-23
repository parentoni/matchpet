import { DownloadMediaUseCase } from "./downloadMediaUseCase";
import { contentManager } from "../../services";

const downloadMediaUseCase = new DownloadMediaUseCase(contentManager);

export { downloadMediaUseCase };

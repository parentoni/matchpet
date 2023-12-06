import { GetAllActiveOrganizationsController } from "./getAllActiveOrganizationsController";
import { GetAllActiveOrganizationsUseCase } from "./getAllActiveOrganizationsUseCase";
import { userRepo } from "../../repository";

const getAllActiveOrganizationsUseCase = new GetAllActiveOrganizationsUseCase(userRepo);
const getAllActiveOrganizationsController = new GetAllActiveOrganizationsController(getAllActiveOrganizationsUseCase);

export { getAllActiveOrganizationsController };

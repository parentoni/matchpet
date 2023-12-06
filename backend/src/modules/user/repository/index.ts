import { Database } from "../../../shared/infra/database";
import { UserRepo } from "./userRepo";
const userRepo = new UserRepo(Database.getInstance().models); //todo Depreceated, change this
export { userRepo };

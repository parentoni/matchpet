import { Secrets } from "../../../config/secretsManager";
import { AuthService } from "./implementations/authService";

const authService = new AuthService(Secrets.getSecret("PRIVATE_KEY"))
export { authService }
import { logUserLastActivityUseCase } from "../useCases/logUserActivity";
import { AfterUserLogIn } from "./afterUserLogIn";

const afterUserLogin = new AfterUserLogIn(logUserLastActivityUseCase);

export { afterUserLogin };

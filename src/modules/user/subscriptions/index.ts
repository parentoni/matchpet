import { logUserLastActivityUseCase } from "../useCases/logUserActivity";
import { AfterUserLogIn } from "./afterUserLogIn";
import { sendUserVerificationEmailUseCase } from "../useCases/sendUserVerificationEmail";
import { AfterUserCreated } from "./afterUserCreated";

new AfterUserLogIn(logUserLastActivityUseCase);
new AfterUserCreated(sendUserVerificationEmailUseCase);


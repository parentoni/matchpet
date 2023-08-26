// // import { Result } from "../../../../shared/core/Result";
// import { BaseError } from "../../../../shared/core/Result";
// import { UseCaseError } from "../../../../shared/core/UseCaseError";

// export namespace CreateUserErrors {
//   export class EmailAlreadyExistsError extends BaseError<> {
//     constructor(email: string, location: string) {
//       super(false, {
//         errorMessage: `The email ${email} associated for this account already exists.`,
//         location: location,
//         code: "EMAIL_CONFLICT"
//       });
//     }
//   }

//   export class CPFAlreadyExistsError extends Result<UseCaseError> {
//     constructor(cpf: string, location: string) {
//       super(false, {
//         message: `The ${cpf} associated for this account already exists.`,
//         location: location,
//         code: "CPF_CONFLICT"
//       });
//     }
//   }
// }

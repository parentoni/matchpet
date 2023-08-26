import { ValueObject } from "../domain/ValueObject";
import { Guard, GuardError } from "./Guard";
import { CommonUseCaseResult } from "./Response/UseCaseError";
import { Either, left, right } from "./Result";

export class ValidUrl extends ValueObject<{value: string}> {
    get value():string {
        return this.props.value
    }

    public static create(props: {value:string}): Either<GuardError | CommonUseCaseResult.InvalidValue, ValidUrl> {
        const guardResult = Guard.againstNullOrUndefined(props.value, "URL")
        if (guardResult.isLeft()) {
            return left(guardResult.value)
        }
        
        try {
            //Check the url
            new URL(props.value)
            
            return right(new ValidUrl(props))
        } catch (error) {
            return left(CommonUseCaseResult.InvalidValue.create({
                location: `${ValidUrl.name}.${ValidUrl.create.name}`,
                errorMessage: "Invalid url",
                variable: "URL"}))
        }
        
       
        
    }
}
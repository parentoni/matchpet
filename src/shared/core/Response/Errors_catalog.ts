
export interface IBaseResponse {message: string, location: string}

export class BaseResponse<T extends IBaseResponse> {
    private value: T;

    constructor (props: T) {
        this.value = props
    }

}
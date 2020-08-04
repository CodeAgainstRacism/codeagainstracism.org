import { ValidationError, ValidatorOptions } from "class-validator";

export interface ValidOptions extends ValidatorOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    errorHttpStatusCode: 442;
    exceptionFactory?: (errors: ValidationError[]) => any;
}
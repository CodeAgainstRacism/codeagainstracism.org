import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { ValidOptions } from "./projects.validoptions";

export function IsValidDate(property: string, ValidOptions?: ValidationOptions) {
    errorHttpStatusCode: 442;

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsValidDate",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: ValidOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value > relatedValue;
                }
            }
        });
   };
}
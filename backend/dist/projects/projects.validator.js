"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidDate = void 0;
const class_validator_1 = require("class-validator");
function IsValidDate(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: "IsValidDate",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value > relatedValue;
                }
            }
        });
    };
}
exports.IsValidDate = IsValidDate;
//# sourceMappingURL=projects.validator.js.map
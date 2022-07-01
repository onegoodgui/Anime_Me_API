import { errorTypes } from "../utils/errorUtils";
export function validateSchemaMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            throw errorTypes.unprocessableEntityError(validation.error.message);
        }
        next();
    };
}

import Joi from "joi";
export var userSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required()
});

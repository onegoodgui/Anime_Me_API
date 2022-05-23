import Joi from "joi";
import { CreateUserData } from "../services/userServices.js";

export const userSchema = Joi.object<CreateUserData>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

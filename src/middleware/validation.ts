import Joi,{Schema} from "joi"

const validateRegister=Joi.object().keys({
    name:Joi.string().required().min(3).max(30),
    email:Joi.string().required().email(),
    password:Joi.any().required(),
    age:Joi.number().integer().required(),
    gender:Joi.string().required(),
    city:Joi.string().required(),
    address:Joi.string().required()
})
export default validateRegister
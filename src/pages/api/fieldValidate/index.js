import { join } from '@prisma/client/runtime/library';
import Joi from 'joi';
const adminSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[9][87]\d{8}$/).required(),
    password: Joi.string().required()
});
const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
const userSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().pattern(/^[9][87]\d{8}$/).required(),
    address:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirm_password: Joi.string().required()
});
const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
const productSchema = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required(),
    price:Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    special:Joi.bool()
});

const ContactSchema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    subject:Joi.string().required(),
    message:Joi.string().required()
});
 export  {adminSchema,adminLoginSchema,userSchema,userLoginSchema,productSchema,ContactSchema};
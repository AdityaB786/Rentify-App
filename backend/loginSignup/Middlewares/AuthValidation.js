const Joi = require('joi')

const signupValidation = ((req,res,next)=>{
    const schema=Joi.object({
        name:Joi.string().min(3).max(20).required(),
        email:Joi.string().required(),
        password:Joi.string().min(4).max(20).required()
    });

    const {error} = schema.validate(req.body);

    if(error)
    {
        return res.status(400).json({message:"An error occurred in Signup validation",error:error.details[0].message})
    }
    next();
})
const loginValidation = ((req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().required(),
        password:Joi.string().min(4).max(15).required()
    });

    const {error} = schema.validate(req.body);

    if(error)
    {
        return res.status(400).json({message:"An error occurred in Login validation",error:error.details[0].message})
    }
    next();
})

module.exports = {signupValidation,loginValidation}

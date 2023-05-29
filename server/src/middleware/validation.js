const methods = ['body','params' , 'query','header']

const validation = (schema)=>{
    let errors = [];
    return (req,res,next)=>{
        methods.forEach(value =>{
            if(schema[value])
            {
                let {error} = schema[value].validate(req[value],{abortEarly:false});
                if(error?.details)
                {
                    error.details.forEach(err=>{
                        errors.push(err.message)
                    })
                }
            }
        })
        if(errors.length)  
        {
            res.status(400).json({status:400 , message:"Failed due to error in validation",errors});
            errors = [];
        } 
        else 
        {
            next()
        }
    }
}

export default validation;
const dataMethod = ['body', 'params', 'query','files', 'headers','file']
export const validation = (schema) => {

    return  (req, res, next) => {
        try {
            const validationArr = []
            dataMethod.forEach(key => {
                if (schema[key]) {
                    // console.log({key,schemaKey:schema[key]});
                    // console.log({req:req[key]});
                    const validationResult = schema[key].validate(req[key], { abortEarly: false })
                    // const validationResult = schema[key].validate(req[key], { abortEarly: false })
                    // console.log({validationResult});
                    if (validationResult?.error?.details) {
                        validationArr.push(validationResult.error.details)
                    }

                }
            })
            if (validationArr.length) {
              return  res.status(400).json({ message: 'Validation error', err: validationArr })
            } else {
                next()
            }
        } catch (error) {
            return  res.status(500).json({ message: 'catch error',error  })

            console.log(error);
        }

    }
}
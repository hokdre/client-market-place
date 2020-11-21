const BAD_INPUT = "ENTITY VALIDATION"
const LOGIN_FAILED = "LOGIN FAILED"

export const action_error_format = (error) => {
    if (!error.response) {
        return  {
            httpCode : 500,
            errors : [],
            error_message : "Internal Server Error"
        }
    }

    switch(error.response.status){
        case 401 : {
            let errors = []
            if(error.response.data.error_message === LOGIN_FAILED){
                errors.push({
                    field : error.response.data.errors.field,
                    message : error.response.data.errors.message
                })
            }    

            return  {
                httpCode : 401,
                errors : errors,
                error_message : error.response.data.error_message
            }        
        }
        case 400 : {
            if(error.response.data.error_message === BAD_INPUT){
                return {
                    httpCode : 400,
                    error_message : error.response.data.error_message,
                    errors : error.response.data.errors
                }
            }

            return {
                httpCode : 400,
                error_message : error.response.data.error_message,
                errors : []
            }
        }
        case 403 : {
            return  {
                httpCode : 403,
                error_message : error.response.data.error_message,
                errors : []
            }
        }
        default : {
            return  {
                httpCode : 500,
                error_message : "Internal Server Error",
                errors : [] 
            }
        }
    }
}
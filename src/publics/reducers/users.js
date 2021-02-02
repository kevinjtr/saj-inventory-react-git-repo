const initState = {
    usersProfile:{},
    errMessage:'',
    message:'',
    isLoading:false,
    isRejected:false,
    isFulfilled:false
}

const users = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'LOGIN_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage: action.payload.response.data.message
            }
        case 'LOGIN_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                token: action.payload
            }
        case 'REGISTER_PENDING':
            return{
                ...state,
                isLoading:true,
                isRejected:false,
                isFulfilled:false
            }
        case 'REGISTER_REJECTED':
            return{
                ...state,
                isLoading:false,
                isRejected:true,
                errMessage:action.payload.response.data.message
            }
        case 'REGISTER_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true
            }
        // case 'GET_PROFILE_PENDING':
        //     return{
        //         ...state,
        //         isLoading:true,
        //         isRejected:false,
        //         isFulfilled:false
        //     }
        // case 'GET_PROFILE_REJECTED':
        //     return{
        //         ...state,
        //         isLoading:false,
        //         isRejected:true,
        //         errMessage:action.payload.response.data.message
        //     }
        // case 'GET_PROFILE_FULFILLED':
        //     return{
        //         ...state,
        //         isLoading:false,
        //         isFulfilled:true,
        //         usersProfile: action.payload.data.data
        //     }
        default:
            return state
    }
}

export default users
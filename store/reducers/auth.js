import { LOGIN, REGISTER,AUTHENTICATE,LOGOUT} from "../actions/auth" //forgotPass

const initialState = {
    token: null,
    userId: null
}

export default (state = initialState,action) => {
    switch(action.type){
        case AUTHENTICATE:
                return {
                    token: action.token,
                    userId: action.userId
                } 
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            }
        case REGISTER:
            return {
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }

}


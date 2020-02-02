import{ GET_USER_INFO, UPDATE_USER_INFO } from "../actions/user"

const initialState = {
    name: 'X',
    email: 'X',
    instaAccount: 'X',
    score: 3
}

export default (state=initialState, action) => {
    switch(action.type){
        case GET_USER_INFO:
            return {
                ...state,
                name: action.name,
                email: action.email,
                instaAccount: action.instaAccount
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                name: action.name,
                email: action.email,
                instaAccount: action.instaAccount
            }
        default:
            return state
    }
}

import{
    JOIN_EVENT,
    GET_ACTIVE_CONTRACTS,
    GET_ACTIVE_EVENTS
} from "../actions/events"

const initialState = {
    activeContracts : [],
    activeEvents: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case JOIN_EVENT:
            return state
        case GET_ACTIVE_CONTRACTS:
            return {
                ...state,
                activeContracts: action.activePostRelationList
            }
        case GET_ACTIVE_EVENTS:
            console.log(action.activeEventObjectList)
            return {
                ...state,
                activeEvents: action.activeEventObjectList
            }
        default:
            return state
    }
}
import{
    JOIN_EVENT,
    GET_ACTIVE_CONTRACTS,
    GET_ACTIVE_EVENTS,
    FIN_EVENT
} from "../actions/events"

const initialState = {
    activeContracts : [],
    activeEvents: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FIN_EVENT:
            return state
        case JOIN_EVENT:
            return state
        case GET_ACTIVE_CONTRACTS:
            return {
                ...state,
                activeContracts: action.activePostRelationList
            }
        case GET_ACTIVE_EVENTS:
            return {
                ...state,
                activeEvents: action.activeEventObjectList
            }
        default:
            return state
    }
}
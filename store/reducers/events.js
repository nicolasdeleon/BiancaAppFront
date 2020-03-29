import{
    JOIN_EVENT,
    GET_ACTIVE_CONTRACTS,
    GET_ACTIVE_EVENTS,
    FIN_EVENT,
    GET_EVENT_REL_STATUS
} from "../actions/events"

const initialState = {
    activeContracts : [],
    activeEvents: [],
    status_postr: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FIN_EVENT:
            return state
        case JOIN_EVENT:
            return state
        case GET_EVENT_REL_STATUS:
            return {
                 ...state,
            status_postr: action.status_postr}
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
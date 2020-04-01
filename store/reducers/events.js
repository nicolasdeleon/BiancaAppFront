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
    contractStatus: [] // Guarda el estado puntual del usuario dependiendo de donde esta parado en la app
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FIN_EVENT:
            return {
                ...state,
           contractStatus: "F"
           }
        case JOIN_EVENT:
            return {
                ...state,
           contractStatus: "2BA"
           }
        case GET_EVENT_REL_STATUS:
            return {
                 ...state,
            contractStatus: action.contractStatus
            }
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
import{ JOIN_EVENT } from "../actions/events"

const initialState = {
    activeEvents: [],
    allEvents : []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case JOIN_EVENT:
            return {
                ...state, //mantengo el valor de los estados que no toco
                activeEvents : [...state.activeEvents,action.activeEvent]
            }
        default:
            return state
    }
}
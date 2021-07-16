import { errorMessageTypes } from "../ReducerTypes";

const initialState = {
    message: null
}

const errorMessageReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case errorMessageTypes.errorOccure:
            return {
                ...state,
                message: payload
            }
        case errorMessageTypes.errorRemove:
            return {
                ...state,
                message: null
            }
        default:
            return state
    }
}

export default errorMessageReducer;
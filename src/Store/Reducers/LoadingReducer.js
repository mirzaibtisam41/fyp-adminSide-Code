import { loadingTypes } from "../ReducerTypes";

const initialState = {
    isLoading: false
}

const LoadingReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case loadingTypes.loadingStart:
            return {
                ...state,
                isLoading: true
            }
        case loadingTypes.loadingEnd:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default LoadingReducer;
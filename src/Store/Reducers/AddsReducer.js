import { addsDataTypes } from "../ReducerTypes";

const initialState = {
    Adds: null,
}

const PostAddsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case addsDataTypes.saveAdds:
            return {
                ...state,
                Adds: payload
            }
        default:
            return state
    }
}

export default PostAddsReducer;
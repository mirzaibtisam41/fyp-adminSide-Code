import { adminLoginTypes } from "../ReducerTypes";

const initialState = {
    admin: null,
    token: null
}

const adminLoginReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case adminLoginTypes.adminLogin:
            return {
                ...state,
                admin: payload.user,
                token: payload.token
            }
        case adminLoginTypes.adminLogout:
            return {
                ...state,
                admin: null,
                token: null
            }
        case adminLoginTypes.updateAdminProfile:
            return {
                ...state,
                admin: payload
            }
        default:
            return state

    }
}

export default adminLoginReducer;
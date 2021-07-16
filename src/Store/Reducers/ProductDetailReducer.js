import { productDetailTypes } from "../ReducerTypes";

const initialState = {
    product: null,
}

const productDetailReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case productDetailTypes.addProductDetail:
            return {
                ...state,
                product: payload
            }
        case productDetailTypes.removeProductDetail:
            return {
                ...state,
                product: null
            }
        default:
            return state
    }
}

export default productDetailReducer;
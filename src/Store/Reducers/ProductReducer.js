import { addProductTypes } from "../ReducerTypes";

const initialState = {
    products: null
}

const productReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case addProductTypes.getAllProducts:
            return {
                ...state,
                products: payload
            }
        case addProductTypes.addProduct:
            return {
                ...state,
                products: [...state.products, state.products.unShift(payload)]
            }
        default:
            return state
    }
}

export default productReducer;
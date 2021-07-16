import { categoriesTypes } from "../ReducerTypes";

const initialState = {
    categories: null,
    subCategoriesByParent: null
}

const categoriesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case categoriesTypes.setAllCategories:
            return {
                ...state,
                categories: payload
            }
        case categoriesTypes.addNewCategories:
            return {
                ...state,
                categories: [...state.categories, payload]
            }
        case categoriesTypes.getSubCategoriesByParent:
            return {
                ...state,
                subCategoriesByParent: payload
            }
        default:
            return state;
    }
}

export default categoriesReducer;
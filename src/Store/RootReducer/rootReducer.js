import { combineReducers } from "redux";
import adminLoginReducer from "../Reducers/AdminLoginReducer";
import errorMessageReducer from "../Reducers/ErrorMessageReducer";
import categoriesReducer from "../Reducers/CategoriesReducer";
import productReducer from "../Reducers/ProductReducer";
import loadingReducer from "../Reducers/LoadingReducer";
import productDetailReducer from "../Reducers/ProductDetailReducer";
import PostAddsReducer from "../Reducers/AddsReducer";

const combine = combineReducers({
    adminLoginReducer, errorMessageReducer, categoriesReducer, productReducer,
    loadingReducer, productDetailReducer, PostAddsReducer
});

export default combine;
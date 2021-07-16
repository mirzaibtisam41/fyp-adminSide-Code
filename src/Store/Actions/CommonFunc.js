import { store } from "../StoreFile/Store";
import { errorMessageTypes, loadingTypes, productDetailTypes } from "../ReducerTypes";

// Function for handle error messages
export const ErrorHandler = (message) => {

    store.dispatch({
        type: errorMessageTypes.errorOccure,
        payload: message
    });

    setTimeout(() => {
        store.dispatch({ type: errorMessageTypes.errorRemove });
    }, 2000);
}

// loading start function
export const startLoadingFunc = () => {
    store.dispatch({
        type: loadingTypes.loadingStart
    });
}

// loading end function
export const EndLoadingFunc = () => {
    store.dispatch({
        type: loadingTypes.loadingEnd
    });
}

// close product detail function
export const closeProductModel = () => {
    store.dispatch({
        type: productDetailTypes.removeProductDetail
    });
}

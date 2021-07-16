import {
    adminLoginTypes, categoriesTypes, addProductTypes,
    productDetailTypes, addsDataTypes
} from "../ReducerTypes";

import {
    adminLoginApi, createNewParentCategoryApi, getAllMainCategoriesAPi, getSubCategoryWithParentNameAPi,
    updateAdminProfileApi, createNewProductAPi, getAllProductAPi, deleteProductApi, updateProductDetailApi,
    addDealsApi, getDealProductsApi, deleteDealProductApi, updateDealProductOfferApi, postNewAddApi,
    getAllAddsApi, deleteAddApi
} from "../../Api/apiActions";

import { store } from "../StoreFile/Store";
import axios from "axios";
import { ErrorHandler, startLoadingFunc, EndLoadingFunc } from "./CommonFunc";

// Function for login admin
export const adminLogin = (loginData) => {
    startLoadingFunc();
    return async (dispatch) => {
        try {
            const { data } = await axios.post(adminLoginApi, loginData);
            if (data) EndLoadingFunc();
            if (data.message) return ErrorHandler({ type: "error", message: data.message });
            if (data.token && data.user) {
                const { token, user } = data;
                dispatch({
                    type: adminLoginTypes.adminLogin,
                    payload: { token, user }
                });
                ErrorHandler({ type: "success", message: "Login Successfull" });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// Function for logout admin
export const adminLogout = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: adminLoginTypes.adminLogout });
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// Function for get all main categories
export const getAllCategories = async () => {
    startLoadingFunc();
    try {
        const { data } = await axios.get(getAllMainCategoriesAPi);
        if (data) {
            EndLoadingFunc();
            store.dispatch({
                type: categoriesTypes.setAllCategories,
                payload: data
            });
        }
    } catch (error) {
        EndLoadingFunc();
        return ErrorHandler({ type: "success", message: error.message });
    }
}

// function for create new category
export const createCategory = (postData) => {
    startLoadingFunc();
    return async (dispatch) => {
        try {
            const { data } = await axios.post(createNewParentCategoryApi, postData);
            if (data) EndLoadingFunc();
            if (data.message) return ErrorHandler({ type: "error", message: data.message });
            if (data.dataNew && data.messageDone) {
                const { messageDone, dataNew } = data;
                ErrorHandler({ type: "success", message: messageDone });
                dispatch({ type: categoriesTypes.addNewCategories, payload: dataNew })
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// Function for getting sub categories with there parent name
export const getSubCategories = (parent) => {
    startLoadingFunc();
    return async (dispatch) => {
        try {
            const { data } = await axios.post(getSubCategoryWithParentNameAPi, { parent });
            if (data) {
                EndLoadingFunc();
                dispatch({ type: categoriesTypes.getSubCategoriesByParent, payload: data });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// Function for update Profile Admin
export const updateAdminProfile = (profileData) => {
    startLoadingFunc();
    const { _id, firstName, lastName, email, password, confirmPassword, file } = profileData;
    let formData = new FormData();
    if (firstName !== null) formData.append("firstName", firstName);
    if (lastName !== null) formData.append("lastName", lastName);
    if (file !== null) formData.append("file", file);
    if (email !== null) formData.append("email", email);
    if (password !== null) formData.append("password", password);
    formData.append("_id", _id);

    return async (dispatch) => {
        try {
            if (password !== confirmPassword) {
                ErrorHandler({ type: "error", message: "Password not match" })
                return EndLoadingFunc();
            };

            const { data } = await axios.post(updateAdminProfileApi, formData);
            if (data) {
                EndLoadingFunc();
                ErrorHandler({ type: "success", message: "Profile Update Successfully" });
                dispatch({ type: adminLoginTypes.updateAdminProfile, payload: data });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// Function for create new product
export const addNewProduct = (data) => {
    startLoadingFunc();
    const { productData, productPics, active } = data;

    let formData = new FormData();
    for (const file of productPics) {
        formData.append("productPics", file);
    }
    formData.append("name", productData.name);
    formData.append("quantity", productData.quantity);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("parent", productData.parent);
    formData.append("active", productData.active);
    formData.append("brand", productData.brand);

    return async (dispatch) => {
        try {
            if (productPics.length > 0) {
                const { data } = await axios.post(createNewProductAPi, formData);
                if (data) EndLoadingFunc();
                if (data.message) return ErrorHandler({ type: "error", message: data.message });
                if (!data.message) {
                    ErrorHandler({ type: "success", message: "Product add Successfully" });
                    dispatch({ type: addProductTypes.getAllProducts, payload: data });
                }
            }
            else {
                EndLoadingFunc();
                ErrorHandler({ type: "error", message: "Product pic required" });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// Function for getting all products
export const getAllProductsFunc = async () => {
    startLoadingFunc();
    try {
        const { data } = await axios.get(getAllProductAPi);
        if (data) {
            EndLoadingFunc();
            store.dispatch({ type: addProductTypes.getAllProducts, payload: data });
        }
    } catch (error) {
        EndLoadingFunc();
        return ErrorHandler({ type: "success", message: error.message });
    }
}

// Function for delete a product
export const deleteProductFunc = (_deleteItemData) => {
    startLoadingFunc();
    return async (dispatch) => {
        try {
            const { data } = await axios.post(deleteProductApi, _deleteItemData);
            if (data) {
                EndLoadingFunc();
                ErrorHandler({ type: "success", message: "Product Delete Successfully" });
                dispatch({ type: addProductTypes.getAllProducts, payload: data });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// Function for see product detail
export const addProductDetailFunc = (data) => {
    return async (dispatch) => {
        console.log(data);
        try {
            dispatch({ type: productDetailTypes.addProductDetail, payload: data });
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// Function for update ProductDetail
export const updateSelectedProduct = (productData) => {
    startLoadingFunc();
    return async (dispatch) => {
        try {
            const { data } = await axios.post(updateProductDetailApi, productData);
            if (data) {
                EndLoadingFunc();
                console.log(data);
                dispatch({ type: addProductTypes.getAllProducts, payload: data });
                return ErrorHandler({ type: "success", message: "Product Update Successfully" });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// function for add deals products
export const addProductDeals = (item) => {
    startLoadingFunc();
    return async (dispatch) => {
        try {
            const { data } = await axios.post(addDealsApi, item);
            if (data.message) {
                EndLoadingFunc();
                ErrorHandler({ type: "error", message: data.message });
            }
            if (!data.message) {
                EndLoadingFunc();
                store.dispatch({ type: addProductTypes.getAllProducts, payload: data });
                ErrorHandler({ type: "success", message: "Product Added Successfully" });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// function for get all deal products
export const getDealProductsFunc = async () => {
    startLoadingFunc();
    try {
        const { data } = await axios.get(getDealProductsApi);
        if (!data.error) {
            EndLoadingFunc();
            store.dispatch({ type: addProductTypes.getAllProducts, payload: data });
        }
        if (data.error) {
            EndLoadingFunc();
            ErrorHandler({ type: "error", message: data.error.message });
        }
    } catch (error) {
        EndLoadingFunc();
        return ErrorHandler({ type: "success", message: error.message });
    }
}

// function for delete delas items products
export const deleteDealsProductItems = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(deleteDealProductApi, { id });
            if (!data.error) {
                EndLoadingFunc();
                store.dispatch({ type: addProductTypes.getAllProducts, payload: data });
                return ErrorHandler({ type: "success", message: 'Product Delete Successfully' });
            }
            if (data.error) {
                EndLoadingFunc();
                ErrorHandler({ type: "error", message: data.error.message });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// function for update discount price for home page deals products
export const updateDealsOfferPrice = (priceObj) => {
    startLoadingFunc()
    return async (dispatch) => {
        try {
            const { data } = await axios.post(updateDealProductOfferApi, priceObj);
            if (!data.error) {
                EndLoadingFunc();
                store.dispatch({ type: addProductTypes.getAllProducts, payload: data });
            }
            if (data.error) {
                EndLoadingFunc();
                ErrorHandler({ type: "error", message: data.error.message });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// functio for post a new add
export const postAddFunc = (addData) => {
    startLoadingFunc();
    let formData = new FormData();
    formData.append("adds", addData.adds);
    formData.append("type", addData.type);

    return async (dispatch) => {
        try {
            if (addData.adds.type.includes("video") || addData.adds.type.includes("image")) {
                const { data } = await axios.post(postNewAddApi, formData);
                if (!data.error) {
                    EndLoadingFunc();
                    dispatch({ type: addsDataTypes.saveAdds, payload: data });
                    return ErrorHandler({ type: "success", message: 'Add Posted Successfully' });
                }
                if (data.error) {
                    EndLoadingFunc();
                    ErrorHandler({ type: "error", message: data.error.message });
                }
            }
            else {
                EndLoadingFunc();
                return ErrorHandler({ type: "error", message: 'Please Upload image/Video data' });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}

// function for get all adds data
export const getAllAddsFunc = async () => {
    startLoadingFunc();
    try {
        const { data } = await axios.get(getAllAddsApi);
        if (!data.error) {
            EndLoadingFunc();
            store.dispatch({ type: addsDataTypes.saveAdds, payload: data });
        }
        if (data.error) {
            EndLoadingFunc();
            ErrorHandler({ type: "error", message: data.error.message });
        };
    } catch (error) {
        EndLoadingFunc();
        return ErrorHandler({ type: "success", message: error.message });
    }
}

// function for delete adds
export const deleteAddsDataFunc = (AddID) => {
    startLoadingFunc();
    return async (dispatch) => {
        try {
            const { data } = await axios.post(deleteAddApi, { AddID });
            if (!data.error) {
                EndLoadingFunc();
                dispatch({ type: addsDataTypes.saveAdds, payload: data });
                return ErrorHandler({ type: "success", message: 'Add Remove Successfully' });
            }
            if (data.error) {
                EndLoadingFunc();
                ErrorHandler({ type: "error", message: data.error.message });
            }
        } catch (error) {
            EndLoadingFunc();
            return ErrorHandler({ type: "error", message: error.message });
        }
    }
}
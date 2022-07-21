import * as types from './actionType';

const initialState = {
    products:[],
    product : [],
    productData: [],
    // loaderText: "Hello ...Please wait while we are loading ......",
}

const productReducers = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case types.GET_SINGLE_PRODUCT: 
            return {
                ...state,
                product : action.payload,
            }
        case types.ADD_PRODUCT:
            const currentCartIndex = state.productData.findIndex(product => product.id === action.payload.id);
            const currentCartData = state.productData[currentCartIndex];
            let modifiedCartData;
            if(currentCartIndex > -1) {
                const cartData = {
                    ...currentCartData,
                    cartDataCount: currentCartData.cartDataCount + action.payload.cartDataCount
                }
                modifiedCartData = [...state.productData];
                modifiedCartData[currentCartIndex] = cartData;
            }
            else {
                modifiedCartData = [...state.productData, action.payload];
            }
            return {
                ...state,
                productData : modifiedCartData,
            }
        case types.INCREMENT: 
        const increaseIndex = state.productData.findIndex(product => product.id === action.payload);
        const increaseCartData = state.productData[increaseIndex];
        let increasedData = [...state.productData];
        const increase = {
            ...increaseCartData,
            productsCount: increaseCartData.productsCount + 1
        }
            increasedData[increaseIndex] = increase;
        return {
            ...state,
            productData: increasedData
        }
        case types.DECREMENT: 
        const decreaseIndex = state.productData.findIndex(product => product.id === action.payload);
        const decreaseCartData = state.productData[decreaseIndex];
        let decreasedData = [...state.productData];
        const decrease = {
            ...decreaseCartData,
            productsCount: decreaseCartData.productsCount - 1
        }
            decreasedData[decreaseIndex] = decrease;
        return {
            ...state,
            productData: decreasedData
        }
        default:
            return state;
    }
}

export default productReducers;
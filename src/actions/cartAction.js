import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import Axios from "../Axios"


// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/v1/product/${id}`);
    console.log(data)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product?.images ? (data.product?.images[0]?.url ? data.product?.images[0]?.url : "https://res.cloudinary.com/vistaprint/images/w_1024,h_1024,c_fill/f_auto,q_auto/v1675872461/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile003_en-us-1/CMT-1630-TshirtDesign-Tile003_en-us-1.png?_i=AA") : "https://res.cloudinary.com/vistaprint/images/w_1024,h_1024,c_fill/f_auto,q_auto/v1675872461/ideas-and-advice-prod/en-us/CMT-1630-TshirtDesign-Tile003_en-us-1/CMT-1630-TshirtDesign-Tile003_en-us-1.png?_i=AA",
            stock: data.product?.stock,
            quantity,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};

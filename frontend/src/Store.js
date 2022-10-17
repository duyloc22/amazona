import { createContext, useReducer } from "react";

export const Store = createContext();

const initalState = {
    cart: {
        cartItem: [],
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM":
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItem: [...state.cart.cartItem, action.payload],
                },
            };
        default:
            return state;
    }
};

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initalState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}

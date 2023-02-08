import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        productsNotFound: []
    },
    reducers: {
        addProducts: (state, action) => {
            state.products = action.payload
        },
        productsNotFound: (state, action) => {
            state.productsNotFound.push(action.payload)
        }
    }
})

export const { addProducts, productsNotFound } = productSlice.actions;

export default productSlice.reducer;
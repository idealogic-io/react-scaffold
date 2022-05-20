import { createSlice } from "@reduxjs/toolkit";

import { getPokemon } from "./actions";

const initialState = {
  value: 0,
  pokemon: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPokemon.fulfilled, (state, action) => {
      state.pokemon = action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

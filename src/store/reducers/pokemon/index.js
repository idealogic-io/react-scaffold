// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "services";

// Comment read about RTK Query here https://redux-toolkit.js.org/tutorials/rtk-query

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  // Comment in real project use next line
  // baseQuery,
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: name => `pokemon/${name}`,
      // Comment you can use next lines to put params into query
      // query: ({ perPage = 20, ...args }) => ({
      //   method: "GET",
      //   url: "/withdrawal/withdrawalList",
      //   params: { perPage, ...args },
      // }),
      // Or use mutation methods POST, DELETE etc.
      // builder.mutation({
      // query: (data) => ({
      // 	method: 'POST',
      // 	url: '/adminwithdrawal/createAdminWithdrawal',
      // 	data,
      // }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi;

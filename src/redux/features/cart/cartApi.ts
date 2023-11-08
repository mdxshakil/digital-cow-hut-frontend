import { apiSlice } from "@/redux/api/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (payload) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        body: payload,
      }),
    }),
    getMyCart: builder.query({
      query: (buyerId) => ({
        url: `/cart/${buyerId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddToCartMutation, useGetMyCartQuery } = cartApi;

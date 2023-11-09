import { apiSlice } from "@/redux/api/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (payload) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["cart"],
    }),
    removeFromCart: builder.mutation({
      query: (cartItemId) => ({
        url: `/cart/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    getMyCart: builder.query({
      query: (buyerId) => ({
        url: `/cart/${buyerId}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetMyCartQuery,
  useRemoveFromCartMutation,
} = cartApi;

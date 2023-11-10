import { apiSlice } from "@/redux/api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrderByTranId: builder.query({
      query: (tranId) => ({
        url: `/orders/transaction/${tranId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { usePlaceOrderMutation, useGetOrderByTranIdQuery } = orderApi;

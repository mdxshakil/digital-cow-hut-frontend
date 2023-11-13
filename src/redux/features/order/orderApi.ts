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
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/deliver/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderByTranIdQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
} = orderApi;

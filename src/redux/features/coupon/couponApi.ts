import { apiSlice } from "@/redux/api/apiSlice";

const couponApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewCoupon: builder.mutation({
      query: (payload) => ({
        url: "/coupon",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["coupon"],
    }),
    getAllCoupon: builder.query({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      providesTags: ["coupon"],
    }),
  }),
});

export const { useAddNewCouponMutation, useGetAllCouponQuery } = couponApi;

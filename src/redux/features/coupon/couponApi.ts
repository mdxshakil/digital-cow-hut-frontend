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
    getMyCoupons: builder.query({
      query: (userId) => ({
        url: `/coupon/${userId}`,
        method: "GET",
      }),
      providesTags: ["user_coupon"],
    }),
    claimCoupon: builder.mutation({
      query: ({ couponId, userId }) => ({
        url: `/coupon/${couponId}`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["user_coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `/coupon/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["coupon"],
    }),
  }),
});

export const {
  useAddNewCouponMutation,
  useGetAllCouponQuery,
  useGetMyCouponsQuery,
  useClaimCouponMutation,
  useDeleteCouponMutation,
} = couponApi;

import { apiSlice } from "@/redux/api/apiSlice";

const cowApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCows: builder.query({
      query: (query) => ({
        url: `/cows?${query}`,
        method: "GET",
      }),
    }),
    postNewCow: builder.mutation({
      query: (data) => ({
        url: "/cows",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seller_cows"],
    }),
    getSellerCows: builder.query({
      query: () => ({
        url: "/cows/my-cows",
        method: "GET",
      }),
      providesTags: ["seller_cows"],
    }),
    deleteCow: builder.mutation({
      query: (cowId) => ({
        url: `/cows/${cowId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["seller_cows"],
    }),
  }),
});

export const {
  useGetAllCowsQuery,
  usePostNewCowMutation,
  useGetSellerCowsQuery,
  useDeleteCowMutation,
} = cowApi;

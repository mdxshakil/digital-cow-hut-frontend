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
    }),
  }),
});

export const { useGetAllCowsQuery, usePostNewCowMutation } = cowApi;

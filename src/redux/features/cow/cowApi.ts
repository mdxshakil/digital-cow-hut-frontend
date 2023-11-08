import { apiSlice } from "@/redux/api/apiSlice";

const cowApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCows: builder.query({
      query: (query) => ({
        url: `/cows?${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCowsQuery } = cowApi;

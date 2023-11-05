import { apiSlice } from "@/redux/api/apiSlice";

const cowApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCows: builder.query({
      query: () => ({
        url: "/cows",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCowsQuery } = cowApi;

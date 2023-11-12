import { apiSlice } from "@/redux/api/apiSlice";

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: (payload) => ({
        url: "/users/my-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyProfileQuery } = profileApi;

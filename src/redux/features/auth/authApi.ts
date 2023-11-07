import { apiSlice } from "@/redux/api/apiSlice";
import { toggleLoading, userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(_data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { accessToken, ...userInfo } = result.data.data;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: accessToken,
            })
          );
          if (result.data.success) {
            dispatch(userLoggedIn(result.data.data.user));
          }
        } catch (error) {
          // nothing to do here
        } finally {
          dispatch(toggleLoading(false));
        }
      },
    }),
    persistLogin: builder.query({
      query: () => ({
        url: "/auth/persist-login",
        method: "GET",
      }),
      async onQueryStarted(_data, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success) {
            dispatch(userLoggedIn(result.data.data.user));
          }
        } catch (error) {
          // nothing to do here
        } finally {
          dispatch(toggleLoading(false));
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, usePersistLoginQuery } =
  authApi;

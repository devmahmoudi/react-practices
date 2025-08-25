// interaction with server by using RTK Query

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api", // default state.api
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1011" }),
  tagTypes: ["BLOG", "USER"],
  endpoints: builder => ({})
});

export default apiSlice;

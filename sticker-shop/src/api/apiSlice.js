import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export default createApi({
  reducerPath: 'stickerShopApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
})
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countQuotesApi = createApi({
  reducerPath: 'countQuotesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getQuotesCount: builder.query({
      query: (username) => `user/level/${username}`,
    }),
  }),
});

export const { useGetQuotesCountQuery } = countQuotesApi;

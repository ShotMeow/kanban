import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Todo', 'Board'],
  endpoints: () => ({}),
});

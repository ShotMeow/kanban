import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Task', 'Board', 'Column'],
  endpoints: () => ({}),
});

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Customer = {
  id: string,
  isActive: boolean,
  company: string,
  industry: string,
  projects: Project[],
  about: string,
}

type Project = {
  id: string,
  name: string,
  contact: string,
  start_date: string,
  end_date: string,
}

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async () => {
    const res = await fetch('https://parloafrontendchallenge.z6.web.core.windows.net/customers.json')
    const customers = await res.json()

    return customers
  }
);

type CustomersState = {
  entities: Customer[]
  loading: 'idle' | 'pending'
  currentRequestId: string | undefined
  error: any
}

const initialState: CustomersState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: {
    [getCustomers.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [getCustomers.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta

      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [getCustomers.rejected.type]: (state, action) => {
      const { requestId } = action.meta

      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
  }
})

export const selectCustomers = (state: RootState) => state.customers

export const customersReducer = customersSlice.reducer

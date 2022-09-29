import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Customer = {
  id: string,
  isActive: boolean,
  company: string,
  industry: string,
  projects: Project[],
  about: string,
  editing: boolean
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

const customersAdapter = createEntityAdapter<Customer>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})

export const customersSlice = createSlice({
  name: 'customers',
  initialState: customersAdapter.getInitialState({ loading: false, error: undefined }),
  reducers: {
    createCustomer: (state, action) => {
      customersAdapter.addOne(state, {
        id: '_' + state.ids[0],
        ...action.payload
      })
    },
    deleteCustomer: (state, action) => {
      customersAdapter.removeOne(state, action.payload)
    },
  },
  extraReducers: {
    [getCustomers.pending.type]: (state) => {
      state.loading = true
    },
    [getCustomers.fulfilled.type]: (state, action) => {
      state.loading = false
      customersAdapter.setAll(state, action.payload)
    },
    [getCustomers.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
  }
})

export const { createCustomer, deleteCustomer } = customersSlice.actions
export const customersSelectors = customersAdapter.getSelectors((state: RootState) => state.customers)

export const customersReducer = customersSlice.reducer

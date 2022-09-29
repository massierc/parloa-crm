import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type Customer = {
  id: string,
  isActive?: boolean,
  company: string,
  industry: string,
  projects?: Project[],
  about?: string,
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
    const industries = (customers as Customer[])
      .map(({ industry }) => industry)
      .filter((value, index, self) => self.indexOf(value) === index)

    return { customers, meta: { industries } }
  }
);

export const getCustomer = createAsyncThunk(
  'customers/getCustomer',
  async (id: string) => {
    const res = await fetch('https://parloafrontendchallenge.z6.web.core.windows.net/customers.json')
    const customers = await res.json() as Customer[]
    const customer = customers.find(c => id === c.id)

    if (!customer) {
      throw new Error(`Couldn't find any customer with id ${id}`)
    }

    return customer
  }
);

const customersAdapter = createEntityAdapter<Customer>({
  selectId: ({ id }) => id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})

type CustomersState = {
  loading: boolean,
  error: any,
  industries: string[],
  filters: string[],
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState: customersAdapter.getInitialState<CustomersState>({
    loading: false,
    error: undefined,
    industries: [],
    filters: [],
  }),
  reducers: {
    createCustomer: (state, action) => {
      customersAdapter.addOne(state, {
        id: '_' + state.ids[0],
        ...action.payload
      })
    },
    updateCustomer: (state, action) => {
      const { id, ...changes } = action.payload
      customersAdapter.updateOne(state, { id, changes })
    },
    deleteCustomer: (state, action) => {
      customersAdapter.removeOne(state, action.payload)
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
  },
  extraReducers: {
    [getCustomers.pending.type]: (state) => {
      state.loading = true
      state.error = undefined
    },
    [getCustomers.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = undefined
      state.industries = action.payload.meta.industries as string[]
      state.filters = action.payload.meta.industries as string[]
      customersAdapter.setAll(state, action.payload.customers)
    },
    [getCustomers.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
    [getCustomer.pending.type]: (state) => {
      state.loading = true
      state.error = undefined
    },
    [getCustomer.fulfilled.type]: (state, action) => {
      state.loading = false
      state.error = undefined

      if (action.payload) {
        customersAdapter.setOne(state, action.payload)
      }
    },
    [getCustomer.rejected.type]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
  }
})

export const { createCustomer, updateCustomer, deleteCustomer, setFilters } = customersSlice.actions
export const customersSelectors = customersAdapter.getSelectors((state: RootState) => state.customers)

export const customersReducer = customersSlice.reducer

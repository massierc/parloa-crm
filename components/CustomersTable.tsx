import { useDispatch } from 'react-redux'
import { getCustomers, customersSelectors, setFilters } from '../slices/customers';
import { Fragment, useEffect, useState } from 'react'
import { AppDispatch, useAppSelector } from '../store'
import { Chip } from '../components/Chip'
import { Spinner } from './Spinner';
import Link from 'next/link';
import { Filters } from './Filters';

export const CustomersTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, filters } = useAppSelector(state => state.customers)
  const customers = useAppSelector(customersSelectors.selectAll)

  useEffect(() => {
    if (customers.length <= 1) dispatch(getCustomers())
  }, [customers, dispatch])

  return (
    <div className="bg-white py-3 md:py-5 px-4 md:px-8 xl:px-10 mb-10 rounded overflow-x-auto">
      <Filters />
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="h-20 text-gray-500 uppercase text-sm leading-normal">
            <th className="px-6 text-left">Company</th>
            <th className="px-6 text-center">Industry</th>
            <th className="px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {loading ? (
            <tr className="relative h-32">
              <td className="absolute inset-0 flex align-middle justify-center pt-6">
                <Spinner />
              </td>
            </tr>
          ) :
            customers
              .filter(({ industry }) => filters.includes(industry))
              .map(({ id, company, industry, isActive }) => {
                return (
                  <Fragment key={id}>
                    <Link href={`/customers/${id}`}>
                      <tr className="h-14 border border-gray-200 font-light hover:bg-slate-50 hover:cursor-pointer">
                        <td className="px-6 text-left whitespace-nowrap">{company}</td>
                        <td className="px-6 text-center whitespace-nowrap">{industry}</td>
                        <td className="px-6 text-center whitespace-nowrap">
                          <Chip emphasis={isActive ? 'success' : 'failure'}>{isActive ? 'active' : 'inactive'}</Chip>
                        </td>
                      </tr>
                    </Link>
                    <tr className="h-3">
                    </tr>
                  </Fragment>
                )
              })}
        </tbody>
      </table>
    </div>
  )
}

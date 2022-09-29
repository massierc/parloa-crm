import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, deleteCustomer, customersSelectors } from '../slices/customers';
import { Fragment, useCallback, useEffect } from 'react'
import { AppDispatch, RootState, useAppSelector } from '../store'
import { Chip } from '../components/Chip'
import { TableAction } from '../components/TableAction';
import { EyeIcon, PencilIcon, TrashIcon } from '../components/Icons';
import { Spinner } from './Spinner';
import Link from 'next/link';

export const CustomersTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const loading = useAppSelector(state => state.customers.loading)
  const customers = useAppSelector(customersSelectors.selectAll)

  const onDelete = useCallback((id: string, company: string) => {
    if (window.confirm(`Are you sure you want to delete ${company}?`)) {
      dispatch(deleteCustomer(id))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getCustomers())
  }, [dispatch])

  return (
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
          customers.map(({ id, company, industry, isActive }) => {
            return (
              <Fragment key={id}>
                <Link href={`/customers/${id}`}>
                  <tr className="h-14 border border-gray-200 font-light hover:bg-slate-50 hover:cursor-pointer">
                    <td className="px-6 text-left whitespace-nowrap">{company}</td>
                    <td className="px-6 text-center whitespace-nowrap">{industry}</td>
                    <td className="px-6 text-center whitespace-nowrap">
                      <Chip emphasis={isActive ? 'success' : 'failure'}>{isActive ? 'active' : 'inactive'}</Chip>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        {!isActive && <TableAction icon={<TrashIcon />} onClick={() => onDelete(id, company)} />}
                      </div>
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
  )
}

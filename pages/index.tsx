import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomers, getCustomers } from '../slices/customers';
import { Fragment, useEffect } from 'react'
import { AppDispatch } from '../store'
import { Chip } from '../components/Chip'
import { TableAction } from '../components/TableAction';
import { EyeIcon, PencilIcon, TrashIcon } from '../components/Icons';



const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: customers, loading } = useSelector(selectCustomers)

  useEffect(() => {
    dispatch(getCustomers())
  }, [dispatch])

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
      <div className="sm:px-6 w-full lg:w-5/6">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <p className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Customers
          </p>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 mb-10 rounded overflow-x-auto">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="h-20 text-gray-500 uppercase text-sm leading-normal">
                <th className="px-6 text-left">Company</th>
                <th className="px-6 text-center">Industry</th>
                <th className="px-6 text-center">Status</th>
                <th className="px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {customers.map(({ id, company, industry, isActive }) => {
                return (
                  <Fragment key={id}>
                    <tr className="h-14 border border-gray-200 font-light">
                      <td className="px-6 text-left whitespace-nowrap">{company}</td>
                      <td className="px-6 text-center whitespace-nowrap">{industry}</td>
                      <td className="px-6 text-center whitespace-nowrap">
                        <Chip emphasis={isActive ? 'success' : 'failure'}>{isActive ? 'active' : 'inactive'}</Chip>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <TableAction icon={<EyeIcon />} onClick={console.log} />
                          <TableAction icon={<PencilIcon />} onClick={console.log} />
                          <TableAction icon={<TrashIcon />} onClick={console.log} />
                        </div>
                      </td>
                    </tr>
                    <tr className="h-3">
                    </tr>
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home

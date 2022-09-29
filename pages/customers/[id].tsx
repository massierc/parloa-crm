import { NextPage } from 'next';
import { AppDispatch, RootState, store, useAppSelector } from '../../store';
import { Layout } from '../../components/Layout';
import { customersSelectors, getCustomer } from '../../slices/customers';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Logo } from '../../components/Logo';
import Link from 'next/link';
import { Spinner } from '../../components/Spinner';

const Customer: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useAppSelector(state => state.customers)
  const customer = useAppSelector((state) => {
    return customersSelectors.selectById(state, id)
  })

  useEffect(() => {
    if (id) dispatch(getCustomer(id))
  }, [id, dispatch])

  return (
    <Layout>
      <div className="px-4 md:px-10 py-4 md:py-7 flex justify-between">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </div>
      <div className="bg-white py-4 md:py-8 px-4 md:px-8 xl:px-10 mb-10 rounded overflow-x-auto">
        {error ? (
          <p className="sm:text-xl md:text-2xl lg:text-3xl text-red-400">Oops. An error occurred 🙈</p>
        ) : (!customer || loading) ? (
          <div className="flex align-middle justify-center py-6">
            <Spinner />
          </div>) : (
          <div>
            <p className="pl-2 text-base text-gray-500">
              <span className="sm:text-xl md:text-2xl lg:text-3xl font-bold leading-normal self-center">
                {customer.company}
              </span>
              <span className="px-2">-</span>
              <span className="sm:text-lg md:text-xl lg:text-2xl font-light">{customer.industry}</span>
            </p>
            <p className="text-gray-800 sm:text-md md:text-lg pt-4 md:pt-5 lg:pt-8 leading-relaxed max-w-prose">{customer.about ?? "Add about section"}</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Customer

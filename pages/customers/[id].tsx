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
  const loading = useAppSelector(state => state.customers.loading)
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
      <div className="bg-white py-3 md:py-5 px-4 md:px-8 xl:px-10 mb-10 rounded overflow-x-auto">
        {(!customer || loading) ? (
          <div className="flex align-middle justify-center py-6">
            <Spinner />
          </div>) : (
          <div>
            <p>{customer.company}</p>
            <p>{customer.industry}</p>
            <p>{customer.about}</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Customer

import type { NextPage } from 'next'
import { CustomersTable } from '../components/CustomersTable';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Layout } from '../components/Layout';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import { CustomerModal } from '../components/CustomerModal';
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { createCustomer } from '../slices/customers';

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Layout>
      <div className="px-4 md:px-10 py-4 md:py-7 flex justify-between">
        <Logo />
        <Button onClick={() => setModalOpen(true)}>Add Customer</Button>
      </div>
      <div className="bg-white py-3 md:py-5 px-4 md:px-8 xl:px-10 mb-10 rounded overflow-x-auto">
        <CustomersTable />
      </div>
      <CustomerModal
        open={modalOpen}
        initialValues={{ company: '', industry: '' }}
        onSubmit={(values) => dispatch(createCustomer(values))}
        onDismiss={() => setModalOpen(false)}
        submitText="Create"
      />
      <Footer />
    </Layout>
  )
}

export default Home

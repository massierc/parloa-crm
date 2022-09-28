import type { NextPage } from 'next'
import { CustomersTable } from '../components/CustomersTable';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Container } from '../components/Container';
import { Footer } from '../components/Footer';

const Home: NextPage = () => {
  return (
    <Container>
      <div className="px-4 md:px-10 py-4 md:py-7 flex justify-between">
        <Logo />
        <Button onClick={console.log}>Add Customer</Button>
      </div>
      <div className="bg-white py-3 md:py-5 px-4 md:px-8 xl:px-10 mb-10 rounded overflow-x-auto">
        <CustomersTable />
      </div>
      <Footer />
    </Container>
  )
}

export default Home

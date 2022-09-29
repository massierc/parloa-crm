import Head from "next/head"

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-w-screen min-h-screen flex justify-center font-sans overflow-hidden">
      <Head>
        <title>Parloa CRM</title>
      </Head>
      <div className="px-2 sm:px-6 w-full lg:w-5/6">
        {children}
      </div>
    </div>
  )
}

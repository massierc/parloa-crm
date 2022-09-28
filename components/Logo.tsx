import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="flex">
      <Image src="/logo.png" alt="logo" width="40" height="40" />
      <p className="pl-2 focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800 self-center">
        CRM
      </p>
    </div>
  )
}

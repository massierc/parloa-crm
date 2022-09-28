type ContainerProps = {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
      <div className="sm:px-6 w-full lg:w-5/6">
        {children}
      </div>
    </div>
  )
}

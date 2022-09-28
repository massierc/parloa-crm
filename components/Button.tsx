type ButtonProps = {
  onClick: () => void,
  children: React.ReactNode,
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-blue-700 hover:bg-blue-600 focus:outline-none rounded">
      <span className="text-sm font-medium leading-none text-white">{children}</span>
    </button>
  )
}

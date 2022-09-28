type ChipProps = {
  emphasis: 'success' | 'warning' | 'failure' | 'info',
  children: React.ReactNode,
}

const classMap: { [Emphasis in ChipProps['emphasis']]: string } = {
  success: 'bg-green-100 text-green-500',
  warning: 'bg-yellow-100 text-yellow-500',
  failure: 'bg-red-100 text-red-500',
  info: 'bg-blue-100 text-blue-500',
}

export const Chip = ({ emphasis, children }: ChipProps) => {
  const className = classMap[emphasis]

  return (
    <span className={`${className} py-1 px-3 rounded-full text-xs`}>
      {children}
    </span>
  )
}

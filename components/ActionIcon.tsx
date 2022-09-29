type TableActionProps = {
  icon: React.ReactNode,
  onClick: () => void
  color?: string
  size: 'sm' | 'md' | 'lg'
}

const sizeMap: { [_ in TableActionProps['size']]: string } = {
  'sm': 'w-4',
  'md': 'w-5',
  'lg': 'w-6',
}

export const ActionIcon = ({ icon, onClick, size }: TableActionProps) => {
  return (
    <div
      className={`${sizeMap[size]} mr-2 transform hover:text-blue-500 hover:scale-110 hover:cursor-pointer`}
      onClick={onClick}>
      {icon}
    </div>
  )
}

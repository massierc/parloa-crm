type TableActionProps = {
  icon: React.ReactNode,
  onClick: () => void
  color?: string
}

export const TableAction = ({ icon, onClick }: TableActionProps) => {
  return (
    <div
      className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 hover:cursor-pointer"
      onClick={onClick}>
      {icon}
    </div>
  )
}

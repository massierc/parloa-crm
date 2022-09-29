type ProjectChipProps = {
  name: string
}

export const ProjectChip = ({ name }: ProjectChipProps) => {
  return (
    <div className="px-6 py-2 mr-2 border-2 text-center text-sm md:text-base whitespace-nowrap align-baseline font-semibold border-purple-400 text-purple-400 hover:bg-purple-50 hover:cursor-pointer rounded-full">
      <span>{name}</span>
    </div>
  )
}

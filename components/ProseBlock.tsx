type ProseBlockProps = {
  children: string
}

export const ProseBlock = ({ children }: ProseBlockProps) => {
  return (
    <p className="text-gray-800 sm:text-md md:text-lg pt-4 md:pt-5 lg:pt-8 leading-relaxed max-w-prose">
      {children}
    </p>
  )
}

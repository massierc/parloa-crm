type ModalProps = {
  open: boolean,
  title: string,
  onDismiss: () => void
  children: React.ReactNode
}

export const Modal = ({ open, title, onDismiss, children }: ModalProps) => {
  return (
    <div className={`${open ? '' : 'hidden'} fixed inset-0 bg-black/50 z-40`}>
      <div id="defaultModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center">
        <div className="relative p-4 pt-10 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-start p-4 rounded-t border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                {title}
              </h3>
              <button onClick={onDismiss} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

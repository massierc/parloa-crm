import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { Modal } from "./Modal"
import { createCustomer } from '../slices/customers';

type CustomerModalProps = {
  open: boolean
  onDismiss: () => void
}

export const CustomerModal = ({ open, onDismiss }: CustomerModalProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const inputElement = useRef<HTMLInputElement>(null);

  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('')

  const ready = company && industry

  const onSubmit = () => {
    if (ready) {
      dispatch(createCustomer({ company, industry }))
      onDismiss()
    }
  }

  useEffect(() => {
    setCompany('')
    setIndustry('')
  }, [open])

  useEffect(() => {
    if (open && inputElement.current) {
      inputElement.current.focus();
    }
  }, [open])

  return (
    <Modal
      open={open}
      title="New Customer"
      onDismiss={onDismiss}
    >
      <div className="p-6 space-y-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
            Company
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
            id="company"
            type="text"
            placeholder="Dunder Mifflin, Inc"
            value={company || ''}
            onChange={(e) => {
              setCompany(e.target.value)
            }}
            ref={inputElement}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
            Industry
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
            id="industry"
            type="text"
            placeholder="Paper"
            value={industry || ''}
            onChange={(e) => {
              setIndustry(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
        <button
          onClick={onSubmit}
          className={`${ready ? 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300' : 'bg-gray-300'} text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          disabled={!ready}
        >
          Create
        </button>
        <button
          onClick={onDismiss}
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

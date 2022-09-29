import { useDispatch } from 'react-redux'
import { setFilters } from '../slices/customers';
import { AppDispatch, useAppSelector } from '../store'


export const Filters = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { industries, filters } = useAppSelector(state => state.customers)

  return (
    <div className="flex flex-wrap items-center pt-4">
      {industries.map((industry) => {
        return (
          <button
            key={industry}
            className={`py-2 px-8 mr-2 mb-3 ${filters.includes(industry) ? 'bg-indigo-100 border-indigo-500 text-indigo-500' : 'border-white text-gray-400 bg-gray-100'} border-2 active:bg-indigo-200 font-semibold rounded-full hover:cursor-pointer`}
            onClick={() => {
              if (filters.includes(industry)) {
                dispatch(setFilters(filters.filter((filter) => filter !== industry)))
              } else {
                dispatch(setFilters([...filters, industry]))
              }
            }}>
            {industry}
          </button>
        )
      })}
    </div>
  )
}

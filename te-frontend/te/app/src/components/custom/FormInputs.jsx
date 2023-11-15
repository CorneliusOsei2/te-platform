import { ExclamationCircleIcon, Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'


export const FormSelect = ({ field, label, data, handleInputChange }) => {

    return (
        <div className=''>
            <label
                htmlFor={field}
                className="block text-sm font-medium leading-6 text-sky-800"
            >
                {label}
            </label>
            <div className="mt-2">
                <select
                    name={field}
                    id={field}
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-sky-600 sm:text-sm sm:leading-6"
                    required
                    onChange={(e) => handleInputChange({ field: field, value: e.target.value })}
                >
                    {data.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>

    )
}


export const InputWithPlaceholderAndValidation = ({ label, field, handleInputChange, validation }) => {
    return (
        <div className="relative mt-2 rounded-md shadow-sm">
            <input
                type="text"
                name={field}
                id={field}
                placeholder={label}
                className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-sky-600 sm:text-sm sm:leading-6"
                aria-invalid={validation}
                onChange={(e) => handleInputChange({ field: field, value: e.target.value, hideCustomInput: false })}
            />
            {validation &&
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                </div>
            }
        </div>
    )
}
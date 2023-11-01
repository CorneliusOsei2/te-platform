import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const statuses = {
    "Offer": 'text-green-400 bg-green-400/10 ring-gray-400/20',
    "HR": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Phone interview": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Final interview": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "OA": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Submitted": 'text-yellow-400 bg-yellow-400/10 ring-yellow-400/30',
    "Rejected": 'text-red-400 bg-red-400/10 ring-red-400/30',
}

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const ApplicationItem = ({ application }) => {
    return (
        <>
            <li key={application.id} className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8 hover:bg-gray-100">
                <div className="min-w-0 flex-auto">
                    <div className="flex items-center gap-x-3">
                        <div className="flex-none rounded-full p-1">
                            <img width="13" height="13" style={{ marginRight: '5px', marginLeft: '5px', marginTop: '-4px' }} className="company-logo" src={application.company.image}></img>
                        </div>
                        <div className="min-w-0 text-sm font-semibold leading-6 text-black">
                            <a href="google.com" className="flex gap-x-2">
                                <span className="truncate">{application.company.name}</span>
                                <span className="text-gray-400">:</span>
                                <span className="whitespace-nowrap">{application.title}, {application.role}</span>
                                <span className="absolute inset-0" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                        <p className="truncate">{application.notes}</p>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <p className="whitespace-nowrap">Added on: {application.date}</p>
                    </div>
                </div>
                <div
                    className={classNames(
                        statuses[application.status],
                        'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                    )}
                >
                    {application.status}
                </div>
                <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </li>
        </>
    )
}

export default ApplicationItem;
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const statuses = {
    offer: 'text-green-400 bg-green-400/10 ring-gray-400/20',
    interview: 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    oa: 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    applied: 'text-yellow-400 bg-yellow-400/10 ring-yellow-400/30',
    reject: 'text-red-400 bg-red-400/10 ring-red-400/30',
}

const Applications = ({ apps }) => {
    return (
        <>
            <ul role="list" className="Applications divide-y divide-white/5">
                {apps.map((app) => (
                    <li key={app.id} className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
                        <div className="min-w-0 flex-auto">
                            <div className="flex items-center gap-x-3">
                                <div className="flex-none rounded-full p-1">
                                    <div className="h-2 w-2 rounded-full bg-current" />
                                </div>
                                <h2 className="min-w-0 text-sm font-semibold leading-6 text-black">
                                    <a href={app.href} className="flex gap-x-2">
                                        <span className="truncate">{app.company}</span>
                                        <span className="text-gray-400">:</span>
                                        <span className="whitespace-nowrap">{app.role}</span>
                                        <span className="absolute inset-0" />
                                    </a>
                                </h2>
                            </div>
                            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                                <p className="truncate">{app.notes}</p>
                                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <p className="whitespace-nowrap">{app.statusText}</p>
                            </div>
                        </div>
                        <div
                            className={classNames(
                                statuses[app.status],
                                'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                            )}
                        >
                            {app.status}
                        </div>
                        <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Applications
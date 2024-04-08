import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { jobStatuses } from './ApplicationInfo'



const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const ApplicationItem = ({ allowSelection, addSelectedItem, application, setApplicationId }) => {

    return (
        <>
            {allowSelection &&
                <input
                    id="comments"
                    aria-describedby="comments-description"
                    name="comments"
                    type="checkbox"
                    checked={application.selected}
                    className="h-4 w-4  text-xs  md:text-sm  rounded-md border-sky-700 text-sky-600 focus:ring-sky-600"
                />
            }

            <div className="min-w-0 flex-auto " onClick={() => { allowSelection ? addSelectedItem(application) : setApplicationId(application.id) }}>
                <div className="flex items-center gap-x-3">
                    <div className="flex-none rounded-full p-1">
                        <img
                            width="13"
                            height="13"
                            alt=""
                            style={{ marginRight: '5px', marginLeft: '5px', marginTop: '-4px' }}
                            className="company-logo"
                            src={application.company.image}>
                        </img>
                    </div>
                    <div className="min-w-0 font-semibold leading-6 text-black">
                        <div className="flex gap-x-2" >
                            <span className="truncate">{application.company.name}</span>
                            <span className="text-gray-400">:</span>
                            <span className="whitespace-nowrap">{application.title}, {application.role}</span>
                            <span className="absolute inset-0" />
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-sm leading-5 text-gray-400">
                    <p className="truncate">{application.notes}</p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="whitespace-nowrap">Added on: {application.date}</p>
                </div>
            </div>
            <div
                className={classNames(
                    jobStatuses[application.status],
                    'rounded-full flex-none py-1 px-2 text-sm font-medium ring-1 ring-inset  max-sm:hidden'
                )}
            >
                {application.status}
            </div>
            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
        </>
    )
}

export default ApplicationItem;
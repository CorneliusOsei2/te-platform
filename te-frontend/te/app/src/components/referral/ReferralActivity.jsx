import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useData } from '../../context/DataContext'

const referralStatuses = ["Requested", "In review", "Completed", "Cancelled"]

const ReferralActivity = () => {

    const { referrals } = useData();

    return (
        <aside className=" lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto px-4  text-sm">
            <header className="flex items-center justify-between">
                <h2 className="text-base font-semibold leading-7 text-sky-600">Activity</h2>
            </header>

            <div className="">
                {<ul className="divide-y divide-white/5">
                    {referrals.filter((referral) => referral.status === "Requested").map((referral, index) => (
                        <li key={index} className="py-4  ">
                            <div className="flex gap-x-1">
                                <div className='text-yellow-400 align-middle bg-yellow-400/10 flex rounded-full p-1'>
                                    <div className="h-1.5 w-1.5 mt-1 rounded-full bg-current" />
                                </div>
                                <h3 className="truncate text-sm font-semibold leading-6 text-slate-700 ">{referral.company.name}{":  "}</h3>
                                <h3 className="truncate text-sm font-semibold leading-6 text-slate-700 ">{referral.job_title ?? "Software Engineer"},</h3>
                                <h3 className="truncate  text-sm font-semibold leading-6 text-black">{referral.role}</h3>
                            </div>
                            <div className="flex">
                                <time dateTime={referral.date} className="text-sm text-gray-600">
                                    {referral.date}
                                </time>
                            </div>
                        </li>
                    ))}
                </ul>}
            </div>

            {
                referralStatuses.map((status) => {
                    return (
                        <>
                            <Disclosure as="div" key="Workshops" className=" py-6">
                                {({ open }) => (
                                    <>
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3">
                                                <span className="font-medium text-gray-900">{status}</span>
                                                <span className="ml-6 flex items-center">
                                                    {open ? (
                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                    ) : (
                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </h3>
                                        <Disclosure.Panel >
                                            {<ul className="divide-y divide-white/5">
                                                {referrals.filter((referral) => referral.status === status).map((referral, index) => (
                                                    <li key={index} className="py-4 ">
                                                        <div className="flex gap-x-1">
                                                            <div
                                                                className={`text-${status === "Completed" ? "green" : "red"}-400 align-middle bg-${status === "Completed" ? "green" : "red"}-400/10 flex rounded-full p-1`}>
                                                                <div className="h-1.5 w-1.5 mt-1 rounded-full bg-current" />
                                                            </div>
                                                            <h3 className="truncate text-sm font-semibold leading-6 text-slate-700 ">{referral.company.name}{":  "}</h3>
                                                            <h3 className="truncate text-sm font-semibold leading-6 text-slate-700 ">{referral.job_title ?? "Software Engineer"},</h3>
                                                            <h3 className="truncate  text-sm font-semibold leading-6 text-black">{referral.role}</h3>
                                                            <time dateTime={referral.date} className="text-sm text-gray-600">
                                                                {referral.date}
                                                            </time>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>


                        </>
                    )
                })
            }
            <div>

            </div>
        </aside>
    )
}

export default ReferralActivity;
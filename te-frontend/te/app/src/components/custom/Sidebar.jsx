import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,

} from '@heroicons/react/24/outline'
import { useAuth } from '../../context/AuthContext'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Sidebar = ({ navigation, content, setContent, setLogin }) => {
    const { accessToken, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <div className="">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex bg-zinc-100">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-gray-100" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2">
                                        <div className="flex h-16 shrink-0 items-center">
                                            {/* <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                                                alt="Your Company"
                                            /> */}
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name} className={classNames(
                                                                (item.name === content)
                                                                    ? 'bg-gray-50  text-blue-400'
                                                                    : ' text-blue-400 hover:bg-gray-50',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )} onClick={(e) => { setContent(e.target.innerText) }}>
                                                                <item.icon
                                                                    className={classNames(
                                                                        (item.name === content) ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500',
                                                                        'h-6 w-6 shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </li>
                                                        ))}

                                                        <hr />
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-sky-900">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200  px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://media.licdn.com/dms/image/C560BAQF-SVzS4qtXJQ/company-logo_100_100/0/1660174624525?e=1707350400&v=beta&t=IFZNDSfFIjzoJ6e657Oh4kEoyKRPvfnigmVojlINTC8"
                                alt="Your Company"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <div className="relative mt-3 mb-3">
                                        <div className="relative flex justify-start">
                                            <span className="bg-sky-900 pr-2 text-sm text-gray-100">Learn</span>
                                        </div>
                                    </div>
                                    <ul className="-mx-2 space-y-1">
                                        {navigation.filter((item) => item.type === "learn").map((item) => (
                                            <li key={item.name} className={classNames(
                                                (item.name === content)
                                                    ? 'bg-gray-50 text-sky-900'
                                                    : 'text-gray-100 hover:text-sky-900 hover:bg-gray-300',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                                onClick={(e) => { setContent(e.target.innerText) }}>
                                                <item.icon
                                                    className={classNames(
                                                        (item.name === content) ? 'text-blue-500' : 'text-gray-100 group-hover:text-blue-500',
                                                        'h-6 w-6 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="relative mt-3 mb-3">
                                        <div className="relative flex justify-start">
                                            <span className="bg-sky-900 pr-2 text-sm text-gray-100">Apps</span>
                                        </div>
                                    </div>

                                    <ul className="-mx-2 space-y-1">
                                        {navigation.filter((item) => item.type === "app").map((item) => (
                                            <li key={item.name} className={classNames(
                                                (item.name === content)
                                                    ? 'bg-gray-50 text-sky-900'
                                                    : 'text-gray-100 hover:text-sky-900 hover:bg-gray-300',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                                onClick={(e) => { setContent(e.target.innerText) }}>
                                                <item.icon
                                                    className={classNames(
                                                        (item.name === content) ? 'text-blue-500' : 'text-gray-100 group-hover:text-blue-500',
                                                        'h-6 w-6 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="relative mt-3 mb-3">
                                        <div className="relative flex justify-start">
                                            <span className="bg-sky-900 pr-2 text-sm text-gray-100">Files</span>
                                        </div>
                                    </div>

                                    <ul className="-mx-2 space-y-1">
                                        {navigation.filter((item) => item.type === "other").map((item) => (
                                            <li key={item.name} className={classNames(
                                                (item.name === content)
                                                    ? 'bg-gray-50 text-sky-900'
                                                    : 'text-gray-100 hover:text-sky-900 hover:bg-gray-300',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                                onClick={(e) => { setContent(e.target.innerText) }}>
                                                <item.icon
                                                    className={classNames(
                                                        (item.name === content) ? 'text-blue-500' : 'text-gray-100 group-hover:text-blue-500',
                                                        'h-6 w-6 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                <li className="-mx-6 mt-auto flex"></li>

                                <li className='flex justify-between'>
                                    <a
                                        href="/"
                                        className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <span aria-hidden="true" className='text-gray-100'>Tom Cook</span>
                                    </a>

                                    {!accessToken &&
                                        <a className=" py-3 flex align-right right-0" href='/login'>
                                            <span className="text-white mr-1">Login </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>
                                        </a>}

                                    {accessToken &&
                                        <button type='submit' className=" py-3 flex align-right right-0" onClick={logout}>
                                            <span className="text-white mr-1">Logout </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>
                                        </button>}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
                    <a href="/">
                        <span className="sr-only">Your profile</span>
                        <img
                            className="h-8 w-8 rounded-full bg-white-50"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
                    </a>
                </div>

            </div>

        </>
    )
}

export default Sidebar;
import { Fragment, useState } from 'react'
import {
    FolderIcon,
    ServerIcon,
    SignalIcon,
    XMarkIcon,

} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'

import { BriefcaseIcon, DocumentIcon, PlusIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Applications from '../application/Applications'
import Sidebar from './Sidebar'
import SortDropdown from '../custom/SortDropdown'
import CreateCompany from '../company/CreateCompany'
import ResumeAndCoverLetter from './ResumeAndCoverLetter'
import UserActivity from './HomeActivity'


const navigation = [
    { name: 'Applications', href: '#', icon: BriefcaseIcon },
    { name: 'Resume and Cover letter', href: '#', icon: DocumentIcon },
    { name: 'Referrals', href: '#', icon: FolderIcon },
    { name: 'Opportunities', href: '#', icon: ComputerDesktopIcon },
    { name: 'Other files', href: '#', icon: FolderIcon },
]


const UserHome = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [content, setContent] = useState("Resume and Cover letter")

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
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

                        <div className="fixed inset-0 flex">
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
                                                <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <Sidebar navigation={navigation} content={content} setContent={setContent} />

                <div className="lg:pl-72 ">
                    <main className="lg:pr-72 bg-slate-100  h-screen">
                        {content == "Applications" && <Applications />}
                        {content == "Resume and Cover letter" && <ResumeAndCoverLetter />}
                    </main>

                </div>
            </div>
        </>
    )
}


export default UserHome;
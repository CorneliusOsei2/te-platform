import { Fragment, useState } from 'react'
import {
    FolderIcon,
    ServerIcon,
    SignalIcon,
    XMarkIcon,

} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import axiosInstance from "../../axiosConfig"

import { BriefcaseIcon, DocumentIcon, CodeBracketIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid'
import Applications from '../application/Applications'
import Sidebar from './Sidebar'
import ResumeAndEssay from '../resume_and_essay/ResumeAndEssay'
import Referrals from '../referral/Referrals'


const navigation = [
    { name: 'Applications', href: '#', icon: BriefcaseIcon },
    { name: 'Resume and Essay', href: '#', icon: DocumentIcon },
    { name: 'Referrals', href: '#', icon: FolderIcon },
    { name: 'Opportunities', href: '#', icon: ComputerDesktopIcon },
    { name: 'Practice Problems', href: '#', icon: CodeBracketIcon },
    { name: 'Other files', href: '#', icon: FolderIcon },
]

let user_id = 1;

const UserHome = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [content, setContent] = useState("Resume and Essay")

    const [essay, setEssay] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    const [resume, setResume] = useState("https://www.corneliusboateng.com/static/media/resume.cae3234606b994411a41.pdf");

    const updateEssayRequest = (essay) => {
        axiosInstance.post(`/users.${user_id}.applications.essay.update`, { "essay": essay })
            .then((response) => {
                setEssay(response.data)
            })
            .catch((error) => {
                console.log("Error!");
            })
    }

    const updateResumeRequest = (essay) => {
        axiosInstance.post(`/users.${user_id}.applications.essay.update`, { "essay": essay })
            .then((response) => {
                setResume(response.data)
            })
            .catch((error) => {
                console.log("Error!");
            })
    }

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
                    <main className="  h-screen">
                        {content == "Applications" && <Applications />}

                        {content == "Resume and Essay" &&
                            <ResumeAndEssay
                                essay={essay}
                                setEssay={setEssay}
                                resume={resume}
                                updateEssayRequest={updateEssayRequest}
                                updateResumeRequest={updateResumeRequest}
                            />}

                        {content == "Referrals" && <Referrals essay={essay} resume={resume} />}
                    </main>

                </div>
            </div>
        </>
    )
}


export default UserHome;
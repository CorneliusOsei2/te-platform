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
import Sidebar from '../custom/Sidebar'
import ResumeAndEssay from '../files/ResumeAndEssay'
import Referrals from '../referral/Referrals'


const navigation = [
    { name: 'Applications', href: '#', icon: BriefcaseIcon },
    { name: 'Resume and Essay', href: '#', icon: DocumentIcon },
    { name: 'Referrals', href: '#', icon: FolderIcon },
    { name: 'Opportunities', href: '#', icon: ComputerDesktopIcon },
    { name: 'Practice Problems', href: '#', icon: CodeBracketIcon },
    { name: 'Other files', href: '#', icon: FolderIcon },
]


const Workspace = ({ setLogin }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [content, setContent] = useState("Resume and Essay")

    const [essay, setEssay] = useState("");
    const [resumes, setResumes] = useState([]);

    localStorage.setItem('prevPage', "/workspace");

    const updateEssayRequest = (essay) => {
        axiosInstance.post(`/applications.essay.update`, { "essay": essay })
            .then((response) => {
                setEssay(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const updateResumeRequest = (essay) => {
        axiosInstance.post(`/applications.essay.update`, { "essay": essay })
            .then((response) => {
                let tmp = resumes;
                tmp.push(response.data);
                setResumes(tmp);
            })
            .catch((error) => {
                console.log(error);
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

                <Sidebar navigation={navigation} content={content} setContent={setContent} setLogin={setLogin} />

                <div className="lg:pl-72 ">
                    <main className="  h-screen">
                        {content === "Applications" ? <Applications />
                            :
                            content === "Resume and Essay" ?
                                <ResumeAndEssay
                                    essay={essay}
                                    setEssay={setEssay}
                                    resumes={resumes}
                                    updateEssayRequest={updateEssayRequest}
                                    updateResumeRequest={updateResumeRequest}
                                />
                                :
                                content === "Referrals" ? <Referrals essay={essay} resumes={resumes} contact={""} /> : <></>}
                    </main>

                </div>
            </div>
        </>
    )
}


export default Workspace;
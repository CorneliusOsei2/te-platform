import { useEffect, useState } from "react";
import Essay from "./Essay";
import { ExclamationTriangleIcon, MagnifyingGlassIcon, DocumentIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import axiosInstance from "../../axiosConfig";

const ResumeAndEssay = ({ resumes, essay, uploadResumeRequest, updateEssayRequest }) => {
    const [showResume, setShowResume] = useState(true);

    return (
        <>
            <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Resume and Essay (Cover Letter)</h1>
            </header>

            <div className="flex mx-6">
                <div className="w-full lg:grid lg:grid-cols-12 lg:gap-x-8">
                    <div className="pb-24  sm:pb-32 lg:col-span-5 lg:px-0 lg:pb-56  h-screen ">
                        <div className="w-full lg:mx-0">
                            <div className="mt-10 w-full flex flex-col">
                                <div className="mt-3 text-lg sm:w-96  lg:w-72 xl:w-96 mx-auto  text-gray-600 ">
                                    <Essay essay={essay} updateEssayRequest={updateEssayRequest} />
                                </div>
                            </div>
                            <div className="flex mt-10">
                                <button
                                    type="button"
                                    className="flex rounded-full mx-auto text-green-600 bg-green-400/10 ring-green-400/30 ring-1 ring-inset ring-green-500  px-4 py-2.5 text-xs font-semibold  shadow-sm hover:bg-green-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                    onClick={() => setShowResume(!showResume)}>
                                    Download Resume <ArrowDownIcon className="ml-3 h-5 w-5" />
                                </button>
                            </div>
                            <div className="flex mt-10">
                                <button
                                    type="button"
                                    className="flex rounded-full mx-auto text-red-600 bg-red-400/10 ring-red-400/30 ring-1 ring-inset ring-red-500  px-4 py-2.5 text-xs font-semibold  shadow-sm hover:bg-red-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    onClick={uploadResumeRequest}>
                                    Upload new resume <DocumentIcon className="ml-3 h-5 w-5" />
                                </button>
                            </div>
                            <div className="flex mt-10">
                                <button
                                    type="button"
                                    className="flex rounded-full mx-auto text-yellow-600 bg-yellow-400/10 ring-yellow-400/30 ring-1 ring-inset ring-yellow-500  px-4 py-2.5 text-xs font-semibold  shadow-sm hover:bg-yellow-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                    onClick={() => setShowResume(!showResume)}>
                                    Request Resume Review <MagnifyingGlassIcon className="ml-3 h-5 w-5" />
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="w-full  lg:col-span-7 xl:relative xl:inset-0  xl:mr-6 h-screen">
                        {resumes.map((resume) => {
                            return (<div>
                                <a href={resume.link}>
                                    <img width="100" height="100" src="https://img.icons8.com/plasticine/100/pdf.png" alt="pdf" />
                                </a>
                            </div>)
                        })
                        }

                        {resumes.map((resume) => {
                            return (<div>
                                <a href={resume.link}>
                                    <img width="100" height="100" src="https://img.icons8.com/plasticine/100/pdf.png" alt="pdf" />
                                </a>
                            </div>)
                        })
                        }

                        {/* {showResume &&
                            <div className="h-full   flex flex-col justify-center">
                                <button
                                    type="button"
                                    className="rounded-full mx-auto text-indigo-600 bg-indigo-400/10 ring-indigo-400/30 ring-1 ring-inset ring-indigo-900  px-4 py-2.5 text-sm font-semibold  shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => setShowResume(!showResume)}>
                                    Hide current resume
                                </button>
                                <div className="relative w-full lg:col-span-5 lg:-mr-8 xl:inset-0  mt-12 h-full">
                                    {resume ?
                                        <embed className="w-full" src={resume} type="application/pdf" width="100%" height="100%" /> :
                                        <div className="mt-2 text-md text-yellow-700 flex">
                                            <ExclamationTriangleIcon className="  h-12 w-12 text-yellow-400" aria-hidden="true" />
                                            No resume currently. Please upload by clicking the Upload button. Thanks!
                                        </div>
                                    }
                                </div>
                            </div>} */}
                    </div>

                </div>



            </div>

        </>
    )
}

export default ResumeAndEssay;
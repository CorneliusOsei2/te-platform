import { useCallback, useEffect, useState } from "react";
import Essay from "../components/file/Essay";
import { PlusIcon, PaperClipIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import axiosInstance from "../axiosConfig";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import FileCreate from "../components/file/FileCreate";
import MissingData from "../components/custom/Alert/MissingData";

const Files = () => {
    const { accessToken } = useAuth();

    const { resumes, otherFiles } = useData();

    const [addFile, setAddFile] = useState(false);
    const [reviewResume, setReviewResume] = useState(false);


    return (
        <>
            {accessToken === null ?
                <div className="flex flex-col  justify-center  h-full overflow-hidden'">
                    <img
                        src="loginCatFiles.png" alt=""
                        className='transition-shadow mx-auto opacity-80  animate-pulse  h-2/3'
                    />
                    <button
                        type="button"
                        className="mt-12 mx-auto w-36 justify-center px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset  bg-sky-700 text-white hover:bg-white hover:text-sky-700"
                    >
                        Log In
                    </button>
                </div>
                :
                <div className="">
                    <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                        <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Resume and Other Files</h1>
                    </header>

                    <div className="flex mx-6">
                        <div className="w-full lg:grid lg:grid-cols-12 lg:gap-x-8">
                            <div className="pb-24  sm:pb-32 lg:col-span-5 lg:px-0 lg:pb-56  h-screen ">
                                <div className="mt-3 text-lg sm:w-96  lg:w-72 xl:w-96 mx-auto  text-gray-600 ">
                                    <Essay />
                                </div>
                            </div>

                            <div className="w-full  lg:col-span-7 xl:relative xl:inset-0  xl:mr-6 h-screen">
                                <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                                    <h1 className="text-base  font-semibold  text-cyan-800">Resumes</h1>
                                    <button
                                        type="button"
                                        className="mt-1 mr-3 animate-bounce rounded-full bg-green-400 p-1 text-gray-900 shadow-sm hover:bg-green-600 hover:animate-none"
                                        onClick={() => setAddFile(true)}
                                    >
                                        <PlusIcon className="h-5 w-5 " aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        className="flex rounded-full text-xs text-yellow-600 bg-yellow-400/10 ring-yellow-400/30 ring-1 ring-inset ring-yellow-500 pl-2  px-1 py-1 font-semibold  shadow-sm hover:bg-yellow-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                        onClick={() => setReviewResume(true)}
                                    >
                                        Request a review <MagnifyingGlassIcon className="ml-1 h-5 w-5 " aria-hidden="true" />
                                    </button>
                                </header>
                                <div className=" px-4 py-6 sm:col-span-2 sm:px-0">
                                    <dd className="mt-2 text-sm text-gray-900">
                                        {resumes.length === 0 ? <MissingData info="No resume(s) uploaded." />
                                            :
                                            <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                {
                                                    resumes.map((resume) => (<li key={resume.id} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                        <div className="flex w-0 flex-1 items-center">
                                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                <span className="truncate font-medium">{resume.name}</span>
                                                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0">
                                                            <a href={resume.link} className="font-medium text-sky-600 hover:text-sky-500">
                                                                View
                                                            </a>
                                                        </div>
                                                    </li>))}
                                            </ul>}
                                    </dd>
                                </div>


                                <hr />

                                <h3 className="text-base text-left mt-6 ml-4  font-semibold leading-7 text-cyan-800">Other Files</h3>
                                <ul className="flex mb-6">
                                    {otherFiles.map((otherFile) => {
                                        return (<li key={otherFile.id} className="flex rounded-md w-40 px-3 py-3 mr-3 justify-center hover:bg-gray-100 ">
                                            <a href={otherFile.link}>
                                                <img className="m-auto" width="100" height="100" src="https://img.icons8.com/plasticine/100/pdf.png" alt={otherFile.name} />
                                                <span className="text-gray-600  line-clamp-2 hover:line-clamp-none">{otherFile.name}</span>
                                            </a>
                                        </li>)
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    {addFile && <FileCreate setFileUpload={setAddFile} />}

                </div>}
        </>
    )
}

export default Files;
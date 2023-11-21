import { useCallback, useEffect, useState } from "react";
import Essay from "../components/file/Essay";
import { ExclamationTriangleIcon, PaperClipIcon, MagnifyingGlassIcon, DocumentIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import axiosInstance from "../axiosConfig";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import FileUpload from "../components/file/FileUpload";
import MissingData from "../components/custom/Alert/MissingData";

const Files = () => {
    const { userId, accessToken } = useAuth();
    const { resumes, otherFiles, setResumes } = useData();
    const [showResume, setShowResume] = useState(true);
    const [uploadFile, setUploadFile] = useState(false)


    const uploadFileRequest = useCallback(() => {
        axiosInstance.get(`/users.${userId}.applications.files.create`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                console.log(response.data)
                setResumes(response.data.files.resumes);
            })
            .catch((error) => {
                console.log(error);
            })
    });


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
                <div className="lg:pr-72 ">
                    <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                        <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Resume and Other Files</h1>
                    </header>

                    <div className="flex mx-6">
                        <div className="w-full lg:grid lg:grid-cols-12 lg:gap-x-8">
                            <div className="pb-24  sm:pb-32 lg:col-span-5 lg:px-0 lg:pb-56  h-screen ">
                                <div className="w-full lg:mx-0">
                                    <div className="mt-10 w-full flex flex-col">
                                        <div className="mt-3 text-lg sm:w-96  lg:w-72 xl:w-96 mx-auto  text-gray-600 ">
                                            <Essay />
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
                                            onClick={() => setUploadFile(true)}>
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
                                <h3 className="text-base text-left mt-6 ml-4  font-semibold leading-7 text-cyan-800">Resumes</h3>
                                <div className=" px-4 py-6 sm:col-span-2 sm:px-0">
                                    <dd className="mt-2 text-sm text-gray-900">
                                        {resumes.length === 0 ? <MissingData info="No resume(s) uploaded." />
                                            :
                                            <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                {
                                                    resumes.map((resume) => (<li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                        <div className="flex w-0 flex-1 items-center">
                                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                <span className="truncate font-medium">{resume.title}</span>
                                                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0">
                                                            <a href={resume.link} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                Download
                                                            </a>
                                                        </div>
                                                    </li>))}
                                            </ul>}
                                    </dd>
                                </div>

                                <ul className="flex mb-6">
                                    {resumes.map((resume) => {
                                        return (<li key={resume.id} className="flex rounded-md w-40 px-3 py-3 mr-3 justify-center hover:bg-gray-100 ">
                                            <a href={resume.link}>
                                                <img className="m-auto" width="100" height="100" src="https://img.icons8.com/plasticine/100/pdf.png" alt={resume.name} />
                                                <span className="text-gray-600  line-clamp-2 hover:line-clamp-none">{resume.title}</span>
                                            </a>
                                        </li>)
                                    })
                                    }
                                </ul>

                                <hr />

                                <h3 className="text-base text-left mt-6 ml-4  font-semibold leading-7 text-cyan-800">Other Files</h3>
                                <ul className="flex mb-6">
                                    {otherFiles.map((resume) => {
                                        return (<li key={resume.id} className="flex rounded-md w-40 px-3 py-3 mr-3 justify-center hover:bg-gray-100 ">
                                            <a href={resume.link}>
                                                <img className="m-auto" width="100" height="100" src="https://img.icons8.com/plasticine/100/pdf.png" alt={resume.name} />
                                                <span className="text-gray-600  line-clamp-2 hover:line-clamp-none">{resume.name}</span>
                                            </a>
                                        </li>)
                                    })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    {uploadFile && <FileUpload setFileUpload={setUploadFile} />}
                </div>}
        </>
    )
}

export default Files;
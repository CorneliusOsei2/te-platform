import { useCallback, useEffect, useState } from "react";
import Essay from "./Essay";
import { DocumentIcon } from '@heroicons/react/20/solid'
import axiosInstance from "../../axiosConfig";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import SlideOverForm from "../custom/SlideOver/SlideOverCreate";


const FileUpload = ({ setFileUpload }) => {

    const uploadFileRequest = () => {
        axiosInstance.post("/companies.create", {})
            .then((response) => {
                let data = response.data;
                console.log(data)
            })
            .catch((error) => {
                console.log("Error!");
            });
    }


    return (
        <>
            <SlideOverForm
                title={"Upload New  File"}
                setHandler={setFileUpload}
                requestHandler={uploadFileRequest}
                children={
                    <div className="px-3 mt-6">
                        <div>
                            <label
                                htmlFor="company-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="company-name"
                                    id="company-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label
                                htmlFor="company-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Type
                            </label>
                            <div className="mt-3">
                                <select
                                    name=""
                                    id=""
                                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    onSelect={() => { }}
                                >
                                    <option value="">Resume</option>
                                    <option value="">Other files (eg: cover letter)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="mt-6">
                                <DocumentIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none  focus-within:ring-offset-2 hover:text-blue-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-center text-gray-600">PDF up to 10MB</p>
                            </div>
                        </div>
                    </div>}
            />
        </>
    )
}

export default FileUpload;
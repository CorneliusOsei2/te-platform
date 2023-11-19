import { useCallback, useEffect, useState } from "react";
import { DocumentIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import axiosInstance from "../../axiosConfig";
import SlideOverForm from "../custom/SlideOver/SlideOverCreate";
import { useData } from "../../context/DataContext";


const ReferralCreate = ({ resumes, company, setCreateReferral, action }) => {

    const createReferralRequest = async () => {
        await axiosInstance.post("/companies.create", {})
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
            {
                <SlideOverForm
                    title={"Request Referral"}
                    setHandler={setCreateReferral}
                    requestHandler={createReferralRequest}
                    children={
                        // action !== null ?
                        // <div className="mt-24  mx-6 border-b-4 border-yellow-400 bg-yellow-50 p-4">
                        //     <div className="flex flex-col items-center">
                        //         <div className="flex-shrink-0">
                        //             <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        //         </div>
                        //         <div className="ml-3">
                        //             <p className="text-md text-yellow-700">
                        //                 {action}
                        //             </p>
                        //         </div>
                        //     </div>
                        // </div> :
                        (<div className="px-3 mt-6">
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                                    Company
                                </label>
                                <div className="mt-2 flex rounded-md shadow-sm">
                                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <img className="h-5 w-5 rounded-full" src={company.image} alt="" />
                                        </div>
                                        <input
                                            type="text"
                                            name="company"
                                            id="company"
                                            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 disabled:cursor-not-allowed text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={company.name}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label
                                    htmlFor="resume"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Select Resume
                                </label>
                                <div className="mt-3">
                                    <select
                                        name=""
                                        id=""
                                        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-sky-600 sm:text-sm sm:leading-6">
                                        {
                                            resumes.map((resume) => (
                                                <option value="">{resume.title}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="mt-6">

                                </div>
                            </div>
                        </div>)
                    }
                />}
        </>
    )
}

export default ReferralCreate;
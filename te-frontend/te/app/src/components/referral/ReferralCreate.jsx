import { useState, useEffect } from 'react'
import axios from 'axios';
import axiosInstance from '../../axiosConfig';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Typeahead from "../custom/Typehead";

const data = [
    'Microsoft',
    'Meta',
    'Google',
    'ServiceNow',
    'Deutsche',
    // Add more company names to this array.
];

const ReferralCreate = ({ setAddCompany }) => {
    const [open, setOpen] = useState(true);
    const [countries, setCountries] = useState([]);
    const [referralData, setReferralData] = useState({
        company: "",
        role: "",
        notes: "",
        resume: "",
    })

    const requestReferral = () => {
        axiosInstance.post("/companies.create", referralData)
            .then((response) => {
                let data = response.data;
                console.log(data)
            })
            .catch((error) => {
                console.log("Error!");
            });
    }

    const handleInputChange = ({ name, value }) => {
        setAppData({ ...appData, [name]: value });
    };

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { alert("Click Cancel or X to Exit") }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white  bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden bg-white rounded-lg border-4 border-sky-400 border-x-sky-700  px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none  focus:text-red-400 focus:ring-offset-2"
                                            onClick={() => { setOpen(false); setAddCompany(false) }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="sm:flex flex-col justify-center sm:items-start">
                                        <div className="mt-2 ml-6">
                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Company
                                                    </label>
                                                    <div className="mt-2">
                                                        <Typeahead name={"company"} value={appData.company} data={data} handler={handleInputChange} />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Role
                                                    </label>
                                                    <div className="mt-2">
                                                        <Typeahead name={"role"} value={appData.role} data={countries} handler={handleInputChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 sm:mt-4 sm:flex justify-center w-full">
                                            <button
                                                type="button"
                                                className="ml-6 mt-3 inline-flex w-full justify-center rounded-full bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-600 hover:text-gray-900 sm:mt-0 sm:w-auto"
                                                onClick={() => { setOpen(false); setAddCompany(false); }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="mr-6 mt-3 inline-flex w-full justify-center rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-600 hover:text-gray-900 sm:mt-0 sm:w-auto"
                                                onClick={requestCreateApplication}
                                            >
                                                Add  App
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>



        </>
    )
}

export default ReferralCreate;
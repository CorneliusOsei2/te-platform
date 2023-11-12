import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import axiosInstance from '../../axiosConfig';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import Typeahead from "../custom/Typehead";
import SlideOverForm from '../custom/SlideOverForm'
import AutoSuggest from '../custom/AutoSuggest'
const data = [
    'Microsoft',
    'Meta',
    'Google',
    'ServiceNow',
    'Deutsche',
    'Map'
];

const ApplicationCreate = ({ addApplication, setAddApplication }) => {
    const [appData, setAppData] = useState({
        company: "",
        role: "",
        deadline: "",
        notes: "",
        recruiter_name: "",
        recruiter_email: ""
    })

    const createUserApplicationRequest = () => {
        axiosInstance.post("/companies.create", appData)
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
        <SlideOverForm
            title={"New Application"}
            setHandler={setAddApplication}
            requestHandler={createUserApplicationRequest}
            children={<div className="flex flex-1 flex-col justify-between">
                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                    <div className="space-y-6 pb-5 pt-6">
                        <div>
                            <label
                                htmlFor="company-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Company name
                            </label>
                            <div className="mt-2">
                                {/* <input
                                    type="text"
                                    name="company-name"
                                    id="company-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                /> */}
                                <AutoSuggest data={data} handler={handleInputChange} />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="company-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Company name
                            </label>
                            <div className="mt-2">
                                <Typeahead name={"company"} value={appData.company} data={data} handler={handleInputChange} />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="company-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Company name
                            </label>
                            <div className="mt-2">
                                {/* <input
                                    type="text"
                                    name="company-name"
                                    id="company-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                /> */}
                                <AutoSuggest data={data} handler={handleInputChange} />
                            </div>
                        </div><div>
                            <label
                                htmlFor="company-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Company name
                            </label>
                            <div className="mt-2">
                                {/* <input
                                    type="text"
                                    name="company-name"
                                    id="company-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                /> */}
                                <AutoSuggest data={data} handler={handleInputChange} />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Notes
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        />


    )
}


export default ApplicationCreate;


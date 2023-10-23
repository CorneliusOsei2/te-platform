import { Fragment, useState, useEffect } from 'react'
import {
    XMarkIcon
} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import axiosInstance from '../../axiosConfig';

import Typeahead from "../custom/Typehead";

const data = [
    'Microsoft',
    'Meta',
    'Google',
    'ServiceNow',
    'Deutsche',
    // Add more company names to this array.
];

const CreateApplication = ({ setAddCompany }) => {
    const [open, setOpen] = useState(true);
    const [countries, setCountries] = useState([]);
    const [appData, setAppData] = useState({
        company: "",
        role: "",
        deadline: "",
        notes: "",
        recruiter_name: "",
        recruiter_email: ""
    })


    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                let data = response.data;
                setCountries(data.map((ent) => ent["name"]["common"]));
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const requestCreateApplication = () => {
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
        <>

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

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={requestCreateApplication}
                >
                    Add
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => { setOpen(false); setAddCompany(false); }}
                >
                    Cancel
                </button>
            </div>

        </>
    )
}

export default CreateApplication;
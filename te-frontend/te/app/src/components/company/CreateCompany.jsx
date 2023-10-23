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
];

const CreateCompany = ({ setAddCompany }) => {
    const [open, setOpen] = useState(true);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const [companyName, setCompanyName] = useState("")
    const [companyDomain, setCompanyDomain] = useState("")
    const [companyLocationData, setCompanyLocationData] = useState({
        country: "",
        city: ""
    })

    const [error, setError] = useState(true);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                let data = response.data.map((ent) => ent["name"]["common"]);
                data.unshift("")
                setCountries(data.sort());
            })
            .catch((error) => {
                setError('Error fetching countries:', error);
            });
    }, []);

    // useEffect(() => {
    //     axios.get(`http://api.geocompanyNames.org/searchJSON?country=${companyLocationData.country}&featureClass=P&usercompanyName=techelevate`)
    //         .then(response => {
    //             const data = response.data;
    //             const cityNames = data.geocompanyNames.map(city => city.companyName);
    //             setCities(cityNames);
    //             setError(null);
    //         })
    //         .catch(_ => {
    //             setError('Error fetching data. Please check your network connection or try again later.');
    //             setCities([]);
    //         });
    // }, [companyLocationData.country]);

    const createCompanyHandler = () => {
        let data = {
            "name": companyName,
            "domain": companyDomain,
            "location": { "country": companyLocationData.country, "city": companyLocationData.city }
        };
        console.log(data);
        axiosInstance.post("/companies.create", data)
            .then((response) => {
                let data = response.data;
                console.log(data)
            })
            .catch((error) => {
                console.log("Error!");
            });
    }

    const handleLocationInputChange = ({ name, value }) => {
        setCompanyLocationData({ ...companyLocationData, [name]: value });
    };

    return (
        <>
            <div className="ml-6">
                <div className=" absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => { setOpen(false); setAddCompany(false) }}
                    >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        Hello
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Add a company.
                        </h3>
                        <div className="mt-2">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <div className="mt-2">
                                        <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Name
                                        </label>
                                        <Typeahead companyName={"companyName"} value={companyName} data={data} handler={({ _, value }) => setCompanyName(value)} />
                                    </div>
                                    <div className="mt-6">
                                        <label htmlFor="companyDomain" className="block text-sm font-medium leading-6 text-gray-900">
                                            Domain
                                            <span className="flex select-none items-center  text-gray-500 sm:text-sm">Eg: microsoft.com, thehive.ai</span>
                                        </label>
                                        <div className="relative ">
                                            <input
                                                type="text"
                                                companyName="companyDomain"
                                                id="companyDomain"
                                                value={companyDomain}
                                                onChange={(e) => setCompanyDomain(e.target.value)}
                                                className="block w-full rounded-t-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <div className="mt-2">
                                        <label htmlFor="first-companyName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            companyName="country"
                                            value={companyLocationData.country}
                                            autoComplete="country-companyName"
                                            className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                                            onChange={(e) => handleLocationInputChange({ "name": "country", "value": e.target.value })}
                                        >
                                            {
                                                countries.map((country) => (
                                                    <option>{country}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    {
                                        companyLocationData.country && (
                                            <div className="mt-6">
                                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                    City (Optional)
                                                </label>
                                                <span className="flex select-none items-center text-gray-500 sm:text-sm"> Choose country first. </span>
                                                <select
                                                    id="city"
                                                    companyName="city"
                                                    value={companyLocationData.city}
                                                    autoComplete="city"
                                                    className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6"
                                                    onChange={(e) => handleLocationInputChange({ "name": "city", "value": e.target.value })}
                                                >
                                                    {
                                                        countries.map((city) => (
                                                            <option>{city}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        onClick={createCompanyHandler}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => { setOpen(false); setAddCompany(false); }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateCompany;
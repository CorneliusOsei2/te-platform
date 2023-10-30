import { Fragment, useEffect, useState } from 'react'

import { PlusIcon } from '@heroicons/react/20/solid'
import SortDropdown from '../custom/SortDropdown'
import CreateCompany from '../company/CreateCompany'
import CreateApplication from './CreateApplication'
import ApplicationItem from './ApplicationItem'
import axiosInstance from '../../axiosConfig'

import { sortByField } from '../../utils'
import { useAuth } from '../AuthContext'

const sortOptions = ["Company name", "Date added", "Status"]

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [addApplication, setAddApplication] = useState(false);
    const [sortBy, setSortBy] = useState("Company name")
    const { accessToken } = useAuth();

    useEffect(() => {
        axiosInstance.get("/applications.list", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setApplications(response.data)
            })
            .catch((error) => {
                console.log(accessToken)
                console.log(error);
            })
    }, [accessToken])

    const handleApplicationsSortBy = (sortBy) => {
        let sorted_applications = [];
        switch (sortBy) {
            case "Company name":
                sorted_applications = sortByField(applications, "company.name")
                break;
            case "Status":
                sorted_applications = sortByField(applications, "status")
                break
            case "Date added":
                sorted_applications = sortByField(applications, "date")
                break

            default:
                break;
        }
        setApplications(sorted_applications);

    }


    return (
        <>
            <div className="lg:pr-72">
                <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Applications</h1>
                    <button
                        type="button"
                        className="rounded-full bg-green-500 p-1 text-gray-900 shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setAddApplication(true)}
                    >
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <SortDropdown sortOptions={sortOptions} handler={handleApplicationsSortBy} />
                </header>

                {
                    !addApplication && <ul role="list" className="Applications divide-y divide-white/5 list-none">
                        {applications.map((application) => (
                            <ApplicationItem application={application} />
                        ))}
                    </ul>
                }

                {addApplication && <CreateApplication setAddCompany={setAddApplication} />}
                {/* {addApplication && <CreateCompany setAddCompany={setAddApplication} />} */}
            </div >
        </>
    )
}

export default Applications
import { useCallback, useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { sortByField } from '../../utils'
import axiosInstance from '../../axiosConfig'
import SortDropdown from '../custom/SortDropdown'
import ApplicationItem from './ApplicationItem'
import Tmp from './ApplicationCreate'
import ApplicationCreate from './ApplicationCreate'


const sortOptions = ["Company name", "Date added", "Status"]

const Applications = () => {
    const [addApplication, setAddApplication] = useState(false);
    const [sortBy, setSortBy] = useState("Company name")
    const { userId, accessToken } = useAuth();
    const { fetchApplications, setFetchApplications, applications, setApplications } = useData();

    const getUserAapplicationsRequest = useCallback(() => {
        axiosInstance.get(`/users.${userId}.applications.list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setApplications(response.data.applications)
            })
            .catch((error) => {
                console.log(accessToken)
                console.log(error);
            })
    });

    useEffect(() => {
        if (fetchApplications && accessToken) {
            getUserAapplicationsRequest();
            setFetchApplications(false);
        }
    }, [accessToken, getUserAapplicationsRequest, fetchApplications, setApplications, setFetchApplications])

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
            <div className="lg:pr-72 ">
                <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Applications</h1>
                    <button
                        type="button"
                        className="mt-1 animate-bounce rounded-full bg-green-400 p-1 text-gray-900 shadow-sm hover:bg-green-600 hover:animate-none"
                        onClick={() => setAddApplication(true)}
                    >
                        <PlusIcon className="h-5 w-5 " aria-hidden="true" />
                    </button>
                    <SortDropdown sortOptions={sortOptions} handler={handleApplicationsSortBy} />
                </header>

                <ul className="Applications divide-y divide-white/5 list-none">
                    {applications.map((application) => (
                        <li key={application.id} className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8 hover:bg-gray-100">
                            <ApplicationItem application={application} />
                        </li>
                    ))}
                </ul>

                {addApplication && <ApplicationCreate addApplication={addApplication} setAddApplication={setAddApplication} />}

            </div >
        </>
    )
}

export default Applications
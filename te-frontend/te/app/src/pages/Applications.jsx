import { useCallback, useEffect, useState } from 'react'
import { PlusIcon, ArchiveBoxIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { sortByField } from '../utils'
import axiosInstance from '../axiosConfig'
import SortDropdown from '../components/custom/SortDropdown'
import ApplicationItem from '../components/application/ApplicationItem'
import Tmp from '../components/application/ApplicationCreate'
import ApplicationCreate from '../components/application/ApplicationCreate'
import ApplicationInfo from '../components/application/ApplicationInfo'
import ApplicationUpdate from '../components/application/ApplicationUpdate'


const sortOptions = ["Company name", "Date added", "Status"]

const Applications = () => {
    const { userId, accessToken } = useAuth();
    const { fetchApplications, setFetchApplications, applications, setApplications } = useData();

    const [applicationId, setApplicationId] = useState(null);
    const [application, setApplication] = useState(null);
    const [addApplication, setAddApplication] = useState(false);
    const [updateApplication, setUpdateApplication] = useState(false);

    const [allowSelection, setAllowSelection] = useState(false);
    const [selectedApplications, setSelectedApplications] = useState({})

    const getUserApplicationsRequest = useCallback(() => {
        axiosInstance.get(`/users.${userId}.applications.list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                let apps = []
                for (let application of response.data.applications) {
                    apps.push({ ...application, selected: false })
                }
                setApplications(apps)
            })
            .catch((error) => {
                console.log(accessToken)
                console.log(error);
            })
    });

    useEffect(() => {
        if (fetchApplications && accessToken) {
            getUserApplicationsRequest();
            setFetchApplications(false);
        }
    }, [accessToken, getUserApplicationsRequest, fetchApplications, setApplications, setFetchApplications])

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

    const handleSelection = () => {
        setAllowSelection(!allowSelection);
    }

    const addSelectedItem = (app) => {
        setSelectedApplications(
            { ...selectedApplications, [app.id]: app.id in selectedApplications ? !selectedApplications[app.id] : true }
        )
        app.selected = !app.selected;

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

                <div className="flex w-full justify-between">
                    <button
                        type="button"
                        className="ml-3   justify-between px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset text-sky-600 bg-sky-400/10 ring-sky-400/20 hover:bg-sky-700 hover:text-white"
                        onClick={handleSelection}
                    >
                        {allowSelection ?
                            <>Disable Selection <XMarkIcon className="h-5 w-5 ml-3" aria-hidden="true" /></> :
                            <>Enable Selection <ArchiveBoxIcon className="h-5 w-5 ml-3" aria-hidden="true" /></>
                        }
                    </button>

                    {allowSelection &&
                        <>                        <button
                            type="button"
                            className="ml-3  justify-between px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset text-yellow-700 bg-yellow-400/10 ring-yellow-400/20 hover:bg-yellow-700 hover:text-white"
                        >
                            Select All
                        </button>
                            <div className="flex text-center justify-end  px-6">
                                <button
                                    type="button"
                                    className="ml-3  justify-between px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset text-gray-500 bg-gray-400/10 ring-gray-400/20 hover:bg-gray-700 hover:text-white"
                                >
                                    Archive <ArchiveBoxIcon className="h-5 w-5 ml-3" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="ml-3  justify-between px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset text-red-500 bg-red-400/10 ring-gray-400/20 hover:bg-red-700 hover:text-white"
                                >
                                    Delete <TrashIcon className="h-5 w-5 ml-3" aria-hidden="true" />
                                </button>
                            </div>
                        </>
                    }
                </div>

                {/* <ul className="divide-y divide-white/5 list-none"> */}
                {applications.map((application) => (
                    <div key={application.id} className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8 ">
                        <ApplicationItem
                            application={application}
                            setApplicationId={setApplicationId}
                            allowSelection={allowSelection}
                            addSelectedItem={addSelectedItem}
                        />
                    </div>
                ))}
                {/* </ul> */}

                {addApplication && <ApplicationCreate addApplication={addApplication} setAddApplication={setAddApplication} />}
                {(applicationId !== null && !updateApplication) &&
                    <ApplicationInfo
                        applicationId={applicationId}
                        setApplicationId={setApplicationId}
                        application={application}
                        setApplication={setApplication}
                        setUpdateApplication={setUpdateApplication}
                    />}

                {updateApplication && <ApplicationUpdate application={application} setApplication={setApplication} />}


            </div >
        </>
    )
}



export default Applications
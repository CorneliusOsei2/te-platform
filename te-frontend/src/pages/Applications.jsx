import { useCallback, useEffect, useState } from 'react'
import { HttpStatusCode } from 'axios'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

import { sortByField } from '../utils'
import { Loading } from '../components/_custom/Loading'
import { PlusIcon, ArchiveBoxIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'

import axiosInstance from '../axiosConfig'
import MenuViewOptionsDropdown from '../components/_custom/MenuViewOptionsDropdown'
import ApplicationItem from '../components/application/ApplicationItem'
import ApplicationCreate from '../components/application/ApplicationCreate'
import ApplicationInfo from '../components/application/ApplicationInfo'
import ApplicationUpdate from '../components/application/ApplicationUpdate'
import Modal from '../components/_custom/Modal'

const sortOptions = ["Company name", "Date added", "Status"]

const Applications = () => {
    const { userId, accessToken, logout } = useAuth();
    const { fetchApplications, setFetchApplications, applications, setApplications } = useData();

    const [error, setError] = useState(true);

    const [applicationId, setApplicationId] = useState(null);
    const [application, setApplication] = useState(null);

    const [addApplication, setAddApplication] = useState(false);
    const [updateApplication, setUpdateApplication] = useState(false);

    const [allowSelection, setAllowSelection] = useState(false);
    const [selectedApplications, setSelectedApplications] = useState({})

    const addSelectedItem = (app) => {
        setSelectedApplications(
            { ...selectedApplications, [app.id]: app.id in selectedApplications ? !selectedApplications[app.id] : true }
        )
        app.selected = !app.selected;
    }

    const selectAllApplications = () => {
        let selected_apps = applications.reduce((app, { id }) => ({ ...app, [id]: true }), {});
        setSelectedApplications(selected_apps);

        for (let app of applications) {
            app.selected = true;
        }
    }

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
    };

    const getUserApplicationsRequest = useCallback(async () => {
        await axiosInstance.get(`/applications.list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((response) => {
            setApplications(response.data.applications.map((application) => ({ ...application, selected: false })));
        }).catch((error) => {
            if (error.response.status === HttpStatusCode.Unauthorized && userId) {
                logout();
            }
            else {
                setError(error.response.data.detail);
            }
        })
    }, [userId, accessToken, setApplications, logout]);

    const archiveUserApplicationRequest = useCallback((applicationIds) => {
        axiosInstance.put(`/applications.archive`, applicationIds, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(() => {
                setFetchApplications(true);
                setApplicationId(null);
            })
            .catch(error => {
                if (error.response.status === HttpStatusCode.Unauthorized && userId) {
                    logout();
                }
                else {
                    setError(error.response.data.detail);
                }
            });
    }, [userId, accessToken, setFetchApplications, logout]);

    const deleteUserApplicationRequest = useCallback((applicationIds) => {
        axiosInstance.put(`/applications.delete`, applicationIds, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
            .then(() => {
                setFetchApplications(true);
                setApplicationId(null);
            })
            .catch(error => {
                if (error.response.status === HttpStatusCode.Unauthorized && userId) {
                    logout();
                }
                else {
                    setError(error.response.data.detail);
                }
            });
    }, [userId, accessToken, setFetchApplications, logout]);


    const handleUserApplicationsArchive = () => {
        const applicationsToArchive = Object.entries(selectedApplications)
            .filter(([_, isSelected]) => isSelected)
            .map(([id, _]) => id);

        if (applicationsToArchive.length > 0) {
            archiveUserApplicationRequest(applicationsToArchive)
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            if (fetchApplications) {
                await getUserApplicationsRequest();
                setTimeout(() => setFetchApplications(false), 700);
            }
        };

        if (fetchApplications) {
            fetchData();
        }
    }, [accessToken, getUserApplicationsRequest, fetchApplications, setFetchApplications]);


    return (
        <>
            <div className="lg:pr-36 ">
                <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Applications</h1>
                    {!fetchApplications &&
                        (accessToken &&
                            <>
                                <button
                                    type="button"
                                    className="mt-1 animate-bounce rounded-full bg-green-400 p-1 text-gray-900 shadow-sm hover:bg-green-600 hover:animate-none"
                                    onClick={() => setAddApplication(true)}
                                >
                                    <PlusIcon className="h-5 w-5 " aria-hidden="true" />
                                </button>
                                <MenuViewOptionsDropdown sortOptions={sortOptions} handler={handleApplicationsSortBy} />
                            </>)}
                </header>
            </div>

            {fetchApplications && <Loading />}

            {
                (!fetchApplications && !accessToken) &&
                <div className="flex flex-col  justify-center w-full  h-full overflow-hidden '">
                    <Modal
                        content={
                            <a href='/login' className="mt-3 m-auto sm:ml-4 flex  py-12 justify-center sm:mt-0 sm:text-left">
                                <button
                                    type="button"
                                    className="w-full cursor-pointer text-lg flex justify-between rounded-full bg-sky-600 px-6 py-2  font-semibold text-white hover:animate-none  hover:bg-gray-50 border border-cyan-600 hover:text-sky-600 sm:ml-3 sm:w-auto"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    <span className='ml-3 text-slate-900'>Log in to view your applications. </span>
                                    <span className='ml-3 animate-spin hover:animate-none'> 🚀</span>
                                </button>
                            </a>
                        } />
                </div>
            }

            {
                !fetchApplications &&
                (<div className="lg:pr-36 ">
                    <div className="flex w-full justify-between">
                        <button
                            type="button"
                            className="ml-3   justify-between px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset text-sky-600 bg-sky-400/10 ring-sky-400/20 hover:bg-sky-700 hover:text-white"
                            onClick={() => setAllowSelection(!allowSelection)}
                        >
                            {
                                !fetchApplications &&
                                (allowSelection ?
                                    <>Disable Selection <XMarkIcon className="h-5 w-5 ml-3" aria-hidden="true" /></> :
                                    <>Enable Selection <ArchiveBoxIcon className="h-5 w-5 ml-3" aria-hidden="true" /></>)
                            }
                        </button>

                        {allowSelection &&
                            <>
                                <button
                                    type="button"
                                    className="ml-3  justify-between px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset text-yellow-700 bg-yellow-400/10 ring-yellow-400/20 hover:bg-yellow-700 hover:text-white"
                                    onClick={selectAllApplications}
                                >
                                    Select All
                                </button>
                                <div className="flex text-center justify-end  px-6">
                                    <button
                                        type="button"
                                        className="ml-3  justify-between px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset text-gray-500 bg-gray-400/10 ring-gray-400/20 hover:bg-gray-700 hover:text-white"
                                        onClick={handleUserApplicationsArchive}
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

                    <ul className="divide-y divide-white/5 list-none mt-3">
                        {applications.map((application) => (
                            <div key={application.id} className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8  hover:bg-slate-100">
                                <ApplicationItem
                                    application={application}
                                    setApplicationId={setApplicationId}
                                    allowSelection={allowSelection}
                                    addSelectedItem={addSelectedItem}
                                />
                            </div>
                        ))}
                    </ul>

                    {addApplication &&
                        <ApplicationCreate
                            setAddApplication={setAddApplication}
                        />
                    }

                    {(applicationId && !updateApplication) &&
                        <ApplicationInfo
                            applicationId={applicationId}
                            setApplicationId={setApplicationId}
                            application={application}
                            setApplication={setApplication}
                            setUpdateApplication={setUpdateApplication}
                            archiveUserApplicationRequest={archiveUserApplicationRequest}
                            deleteUserApplicationRequest={deleteUserApplicationRequest}
                        />}

                    {updateApplication && <ApplicationUpdate
                        application={application}
                        setApplication={setApplication}
                        setUpdateApplication={setUpdateApplication}
                    />}
                </div >
                )
            }


        </>
    )
}



export default Applications
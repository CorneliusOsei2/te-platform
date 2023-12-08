import { Fragment, useCallback, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import axiosInstance from '../../axiosConfig';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import SlideOverInfo from '../custom/SlideOver/SlideOverInfo'
import { useAuth } from '../../context/AuthContext'

export const jobStatuses = {
    "Offer": 'text-green-900 bg-green-300/10 ring-green-400/30',
    "HR": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Phone interview": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Final interview": 'text-blue-900 bg-blue-300/10 ring-blue-400/30',
    "OA": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Submitted": 'text-yellow-900 bg-yellow-300/10 ring-yellow-400/30',
    "Rejected": 'text-gray-900 bg-gray-300/10 ring-gray-400/30',
}

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const ApplicationInfo = ({ applicationId, setApplicationId, application, setApplication, setUpdateApplication }) => {
    const { userId, accessToken } = useAuth();

    const getUserApplicationRequest = useCallback(() => {
        axiosInstance.get(`/users.${userId}.applications.${applicationId}.info`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setApplication(response.data.application)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [accessToken, applicationId, setApplication, userId]);

    const archiveUserApplicationRequest = useCallback(() => {
        axiosInstance.put(`/users.${userId}.applications.archive`, [applicationId],
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                setApplication(response.data.application)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [accessToken, applicationId, setApplication, userId]);

    const archiveApplicationHandler = () => {
        archiveUserApplicationRequest();
    }

    const deleteUserApplicationRequest = useCallback(() => {
        axiosInstance.put(`/users.${userId}.applications.delete`, [applicationId],
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                setApplication(response.data.application)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [accessToken, applicationId, setApplication, userId]);

    const deleteApplicationHandler = () => {
        deleteUserApplicationRequest();
    }

    useEffect(() => {
        if (application === null) {
            getUserApplicationRequest();
        }
    }, [application, applicationId, getUserApplicationRequest])

    return (
        <>
            {
                application !== null && <SlideOverInfo
                    setHandler={(val) => { setApplicationId(val); setApplication(null) }}
                    archiveHandler={archiveApplicationHandler}
                    deleteHandler={deleteApplicationHandler}
                    title={
                        <div className="flex rounded-full p-1">
                            <img
                                width="30"
                                height="30"
                                alt=""
                                style={{ marginRight: '5px', marginLeft: '5px', marginTop: '-4px' }}
                                className="company-logo"
                                src={application.company.image}>
                            </img>
                            <h3 className='ml-3'>{application.company.name}</h3>
                        </div>
                    }
                    children={

                        <div className="space-y-6 pb-16 px-3">
                            <div className="mt-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                                        {application.title}, {application.role}
                                    </h3>
                                    <span className='text-sm text-slate-500'>{application.location.city}, {application.location.country}</span>
                                </div>
                                <button
                                    type="button"
                                    className=" h-5 w-5 flex items-center justify-center rounded-full bg-white text-blue-400 hover:bg-blue-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onClick={() => setUpdateApplication(true)}
                                >
                                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            <div>
                                <dl className="mt-3 divide-y divide-gray-200 border-b border-t border-gray-200">
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Status</dt>
                                        <dd className={classNames(
                                            jobStatuses[application.status],
                                            'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                        )}> {application.status}</dd>

                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Referred</dt>
                                        <dd className="text-gray-900"> {application.referred === true ? "Yes" : "No"}</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Added on</dt>
                                        <dd className="text-gray-900">{application.date} </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Recruiter Name</dt>
                                        <dd className="text-gray-900">{application.recruiter_name}</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Recruiter Email</dt>
                                        <dd className="text-gray-900">{application.recruiter_email}</dd>
                                    </div>
                                </dl>
                            </div>
                            <div>
                                <h3 className="font-medium text-sky-800">Notes</h3>
                                <div className="mt-2 flex items-center justify-between border-b">
                                    <p className="text-sm italic text-black">{application.notes} None at the moment</p>
                                </div>
                            </div>
                        </div>
                    }
                />
            }

        </>

    )

}


export default ApplicationInfo;


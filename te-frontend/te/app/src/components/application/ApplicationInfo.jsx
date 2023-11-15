import { Fragment, useCallback, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import axiosInstance from '../../axiosConfig';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import SlideOverInfo from '../custom/SlideOverInfo'
import { useAuth } from '../../context/AuthContext'

export const jobStatuses = {
    "Offer": 'text-green-400 bg-green-400/10 ring-gray-400/20',
    "HR": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Phone interview": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Final interview": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "OA": 'text-blue-400 bg-blue-400/10 ring-blue-400/30',
    "Submitted": 'text-yellow-900 bg-yellow-300/10 ring-yellow-400/30',
    "Rejected": 'text-red-400 bg-red-400/10 ring-red-400/30',
}

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const ApplicationInfo = ({ applicationId, setApplicationId }) => {
    const { userId, accessToken } = useAuth();
    const [application, setApplication] = useState(null);

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
    });

    useEffect(() => {
        if (application === null) {
            getUserApplicationRequest();
        }
    }, [application, applicationId, getUserApplicationRequest])

    return (
        <>
            {
                application !== null && <SlideOverInfo
                    setHandler={setApplicationId}
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
                                </div>
                                <button
                                    type="button"
                                    className=" h-5 w-5 flex items-center justify-center rounded-full bg-white text-blue-400 hover:bg-blue-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            <div>
                                <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Status</dt>
                                        <dd className={classNames(
                                            jobStatuses[application.status],
                                            'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                        )}> {application.status}</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Referred</dt>
                                        <dd className="text-gray-900"> {application.referred}</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Location</dt>
                                        <dd className="text-gray-900"> {application.location.country}</dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Added on</dt>
                                        <dd className="text-gray-900">{application.date} </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-gray-500">Recruiter</dt>
                                        <dd className="text-gray-900">{application.recruiter && `${application.recruiter} (email: ${application.recruiter_email}`}</dd>
                                    </div>
                                </dl>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Notes</h3>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="text-sm italic text-gray-500">{application.notes}</p>

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


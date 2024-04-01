import { Fragment, useCallback, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import axiosInstance from '../../axiosConfig';

import { useAuth } from '../../context/AuthContext'
import SlideOverUpdate from '../_custom/SlideOver/SlideOverUpdate'
import { FormSelect, FormInput } from '../_custom/FormInputs'
import { setNestedPropertyValue } from '../../utils'
import { jobStatuses } from './ApplicationInfo'
import { customInputMap } from './ApplicationCreate'
import { countries } from '../../data/data'


const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const ApplicationUpdate = ({ application, setApplication, setUpdateApplication }) => {
    const { userId, accessToken } = useAuth();

    const [updateData, setUpdateData] = useState({
        id: application.id,
        status: application.status,
        referred: application.referred,
        notes: application.notes,
        recruiter_name: application.recruiter_name,
        recruiter_email: application.recruiter_email,
        location: {
            country: application.location?.country,
            city: application.location?.city
        }
    })

    const [showCustomInputs, setShowCustomInputs] = useState({
        showCustomCompany: false,
        showCustomJobTitle: false,
        showCustomJobRole: false,
        showCustomStatus: false,
    })
    const [customInputValidation, setCustomInputValidation] = useState({
        validCustomCompany: true,
        validCustomJobTitle: true,
        validCustomJobRole: true,
        validCustomStatus: true,
    })

    const updateUserApplicationRequest = useCallback(() => {
        updateData.referred = updateData.referred !== "Yes" ? true : false;
        axiosInstance.put(`/users.${userId}.applications.${application.id}.update`,
            { ...updateData },
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
    });

    useEffect(() => {
        if (application === null) {
            updateUserApplicationRequest();
        }
    }, [application, updateUserApplicationRequest])

    const updateApplication = () => {
        updateUserApplicationRequest();
        setUpdateApplication(false);
    }

    const handleInputChange = ({ field, value, hideCustomInput = true }) => {
        console.log(field, value)
        if (value === "Other.......") {
            setShowCustomInputs({ ...showCustomInputs, [customInputMap[field]]: true });
            setUpdateData(setNestedPropertyValue({ ...updateData }, field, ""));
        } else {
            if (hideCustomInput) {
                setShowCustomInputs({ ...showCustomInputs, [customInputMap[field]]: false });
            }
            setUpdateData(setNestedPropertyValue({ ...updateData }, field, value))
        }
    };

    return (
        <>
            {
                application !== null &&
                <SlideOverUpdate
                    setHandler={setApplication}
                    updateHandler={updateApplication}
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
                            </div>

                            <div>
                                <dl className="mt-3 divide-y divide-gray-200 border-b border-t border-gray-200">
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Country</dt>
                                        <dd className="text-gray-900 -mt-3">
                                            <FormSelect
                                                field="location.country"
                                                data={countries}
                                                value={updateData.location.country}
                                                handleInputChange={handleInputChange}
                                            />
                                        </dd>
                                    </div>

                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">City</dt>
                                        <dd className="text-gray-900 -mt-3">
                                            <FormInput
                                                type='text'
                                                field="location.city"
                                                value={updateData.location.city}
                                                handleInputChange={handleInputChange}
                                            />
                                        </dd>
                                    </div>

                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Status</dt>
                                        <dd className="text-gray-900 -mt-3">
                                            <FormSelect
                                                field="status"
                                                data={Object.keys(jobStatuses)}
                                                value={updateData.status}
                                                handleInputChange={handleInputChange}
                                            />
                                        </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Referred</dt>
                                        <dd className="text-gray-900 -mt-3">
                                            <FormSelect
                                                field="referred"
                                                data={["Yes", "No"]}
                                                value={updateData.referred}
                                                handleInputChange={handleInputChange}
                                            />
                                        </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Recruiter Name</dt>
                                        <dd className="text-gray-900 -mt-3">
                                            <FormInput
                                                type='text'
                                                field="recruiter_name"
                                                handleInputChange={handleInputChange}
                                            />
                                        </dd>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm font-medium">
                                        <dt className="text-sky-800">Recruiter Email</dt>
                                        <dd className="text-gray-900 -mt-3">
                                            <FormInput
                                                type="email"
                                                field="recruiter_email"
                                                value={updateData.recruiter_email}
                                                handleInputChange={handleInputChange}
                                            />
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <div>
                                <h3 className="font-medium text-sky-800">Notes</h3>
                                <div className="mt-2 flex items-center justify-between border-b">
                                    <p className="text-sm italic text-black">{updateData.notes} None at the moment</p>
                                </div>
                            </div>
                        </div>
                    }
                />
            }

        </>

    )

}


export default ApplicationUpdate;


import { useState } from 'react'
import axiosInstance from '../../axiosConfig';
import { jobStatuses } from './ApplicationInfo'

import SlideOverForm from '../_custom/SlideOver/SlideOverCreate'
import { setNestedPropertyValue } from '../../utils'
import { countries, jobRoles, jobTitles } from '../../data/data'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import SuccessFeedback from '../_custom/Alert/SuccessFeedback'
import { FormSelect, FormInput, FormTextArea } from '../_custom/FormInputs'


export const customInputMap = {
    "title": "showCustomJobTitle",
    "role": "showCustomJobRole",
    "company": "showCustomCompany"
}

const ApplicationCreate = ({ setAddApplication }) => {
    const { userId, accessToken } = useAuth();
    const { setFetchApplications, companies } = useData();

    const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);

    const [appData, setAppData] = useState({
        company: "",
        company_other: "",
        title: "",
        role: "",
        deadline: "",
        notes: "",
        status: "",
        recruiter_name: "",
        recruiter_email: "",
        location: {
            country: "",
            city: "",
        }
    })

    const createUserApplicationRequest = () => {
        axiosInstance.post(`/users.${userId}.applications.create`,
            {
                ...appData,
                company: appData.company_other ? appData.company_other : appData.company,
                title: appData.title_other ? appData.title_other : appData.title,
                role: appData.role_other ? appData.role_other : appData.role
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((_) => {
                setFetchApplications(true);
                setShowSuccessFeedback(true);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const handleInputChange = ({ field, value }) => {
        setAppData((prevAppData) =>
            setNestedPropertyValue({ ...prevAppData }, field, value)
        );
    };



    return (
        <SlideOverForm
            title={"New Application"}
            setHandler={setAddApplication}
            requestHandler={createUserApplicationRequest}
            children={<div className="flex flex-1 flex-col justify-between">
                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                    <div className="space-y-6 pb-5 pt-6">

                        {showSuccessFeedback &&
                            <SuccessFeedback
                                message={"Application successfully added."}
                                setShowSuccessFeedback={setShowSuccessFeedback}
                            />
                        }

                        <FormSelect label="Company" field="company" data={[...companies, "Other....."]} handleInputChange={handleInputChange} required={true} />
                        {appData.company === "Other....." &&
                            <FormInput
                                placeholder="Specify company: "
                                field="company_other"
                                handleInputChange={handleInputChange}
                                required={true}
                            />
                        }

                        <div className="flex mt-3 justify-between ">
                            <FormSelect label="Title" field="title" data={jobTitles} handleInputChange={handleInputChange} required={true} />
                            <FormSelect label="Role" field="role" data={jobRoles} handleInputChange={handleInputChange} required={true} />
                        </div>

                        <div className='flex justify-between'>
                            {appData.title === "Other....." &&
                                <FormInput
                                    placeholder="Specify title: "
                                    field="title_other"
                                    handleInputChange={handleInputChange}
                                    required={true}
                                />
                            }

                            {appData.role === "Other....." &&
                                <FormInput
                                    placeholder="Specify role: "
                                    field="role_other"
                                    handleInputChange={handleInputChange}
                                    required={true}
                                />
                            }
                        </div>

                        <FormSelect label="Status" field="status" data={Object.keys(jobStatuses)} handleInputChange={handleInputChange} required={true} />

                        <div className="flex justify-between">
                            <FormSelect label="Country" field="location.country" data={countries} handleInputChange={handleInputChange} required={false} />
                            <FormInput label="City" field="location.city" data={[]} handleInputChange={handleInputChange} required={false} />
                        </div>

                        <FormTextArea label="Notes" field="notes" handleInputChange={handleInputChange} required={true} />
                    </div>
                </div>
            </div >}
        />
    )
}


export default ApplicationCreate;


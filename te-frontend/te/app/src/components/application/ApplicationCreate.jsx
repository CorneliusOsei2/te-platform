import { useState } from 'react'
import axiosInstance from '../../axiosConfig';
import { jobStatuses } from './ApplicationInfo'

import SlideOverForm from '../custom/SlideOver/SlideOverCreate'
import { setNestedPropertyValue } from '../../utils'
import { countries, jobRoles, jobTitles } from '../../data/data'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import SuccessFeedback from '../custom/Alert/SuccessFeedback'
import { FormSelect, FormInputWithValidation, TextArea } from '../custom/FormInputs'


export const customInputMap = {
    "title": "showCustomJobTitle",
    "role": "showCustomJobRole",
    "company": "showCustomCompany"
}

const ApplicationCreate = ({ setAddApplication }) => {
    const { accessToken } = useAuth();
    const { setFetchApplications, companies } = useData();

    const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
    const [showCustomInputs, setShowCustomInputs] = useState({
        showCustomCompany: false,
        showCustomJobTitle: false,
        showCustomJobRole: false,
        showCustomStatus: false,
    })

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
        axiosInstance.post("/applications.create", { ...appData, company: appData.company_other ? appData.company_other : appData.company },
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
                            <FormInputWithValidation
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
                            {showCustomInputs.showCustomJobTitle &&
                                <FormInputWithValidation
                                    placeholder="Specify title: "
                                    field="title"
                                    handleInputChange={handleInputChange}
                                />
                            }

                            {showCustomInputs.showCustomJobRole &&
                                <FormInputWithValidation
                                    placeholder="Specify role: "
                                    field="role"
                                    handleInputChange={handleInputChange}
                                    required={true}
                                />
                            }
                        </div>

                        <FormSelect label="Status" field="status" data={Object.keys(jobStatuses)} handleInputChange={handleInputChange} required={true} />

                        <div className="flex justify-between">
                            <FormSelect label="Country" field="location.country" data={countries} handleInputChange={handleInputChange} required={false} />
                            <FormInputWithValidation label="City" field="location.city" data={[]} handleInputChange={handleInputChange} required={false} />
                        </div>

                        <TextArea label="Notes" field="notes" handleInputChange={handleInputChange} required={true} />
                    </div>
                </div>
            </div >}
        />
    )
}


export default ApplicationCreate;


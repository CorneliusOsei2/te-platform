import { Fragment, useState } from 'react'
import axiosInstance from '../../axiosConfig';
import { jobStatuses } from './ApplicationInfo'

import SlideOverForm from '../custom/SlideOver/SlideOverCreate'
import { getNestedPropertyValue, setNestedPropertyValue } from '../../utils'
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
    const { companies, setFetchApplications } = useData();

    const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
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
    const [appData, setAppData] = useState({
        company: companies ? companies[0] : "",
        title: jobTitles.length > 0 ? jobTitles[0] : "",
        role: jobRoles.length > 0 ? jobRoles[0] : "",
        deadline: "",
        notes: "",
        status: "Applied",
        recruiter_name: "",
        recruiter_email: "",
        location: {
            country: "",
            city: "",
        }
    })

    const createUserApplicationRequest = () => {
        axiosInstance.post("/applications.create", appData,
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

    const handleInputChange = ({ field, value, hideCustomInput = true }) => {
        if (value === "Other.......") {
            setAppData((prevAppData) => {
                const tmp = setNestedPropertyValue({ ...prevAppData }, field, "");
                setShowCustomInputs({ ...showCustomInputs, [customInputMap[field]]: true });
                return tmp;
            });
        } else {
            if (hideCustomInput) {
                setShowCustomInputs({ ...showCustomInputs, [customInputMap[field]]: false });
            }
            setAppData((prevAppData) =>
                setNestedPropertyValue({ ...prevAppData }, field, value)
            );
        }
    };



    const validateCustomInput = () => {
        setCustomInputValidation({
            validCustomCompany: appData.company.trim() !== "",
            validCustomJobRole: appData.role.trim() !== "",
            validCustomJobTitle: appData.title.trim() !== "",
        })
    }

    return (
        <SlideOverForm
            title={"New Application"}
            setHandler={setAddApplication}
            requestHandler={createUserApplicationRequest}
            validateCustomInput={validateCustomInput}
            customInputValidation={customInputValidation}
            children={<div className="flex flex-1 flex-col justify-between">
                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                    <div className="space-y-6 pb-5 pt-6">

                        {showSuccessFeedback &&
                            <SuccessFeedback
                                message={"Application successfully added."}
                                setShowSuccessFeedback={setShowSuccessFeedback}
                            />
                        }

                        <FormSelect label="Company" field="company" data={companies} handleInputChange={handleInputChange} />
                        {showCustomInputs.showCustomCompany &&
                            <FormInputWithValidation
                                placeholder="Specify company: "
                                field="company"
                                handleInputChange={handleInputChange}
                                validation={!customInputValidation.validCustomCompany}
                            />
                        }

                        <div className="flex mt-3 justify-between ">
                            <FormSelect label="Title" field="title" data={jobTitles} handleInputChange={handleInputChange} />
                            <FormSelect label="Role" field="role" data={jobRoles} handleInputChange={handleInputChange} />
                        </div>

                        <div className='flex justify-between'>
                            {showCustomInputs.showCustomJobTitle &&
                                <FormInputWithValidation
                                    placeholder="Specify title: "
                                    field="title"
                                    handleInputChange={handleInputChange}
                                    validation={!customInputValidation.validCustomJobTitle}
                                />
                            }

                            {showCustomInputs.showCustomJobRole &&
                                <FormInputWithValidation
                                    placeholder="Specify role: "
                                    field="role"
                                    handleInputChange={handleInputChange}
                                    validation={!customInputValidation.validCustomJobRole}
                                />
                            }
                        </div>

                        <FormSelect label="Status" field="status" data={Object.keys(jobStatuses)} handleInputChange={handleInputChange} />

                        <div className="flex justify-between">
                            <FormSelect label="Country" field="location.country" data={countries} handleInputChange={handleInputChange} />
                            <FormSelect label="City" field="location.city" data={[]} handleInputChange={handleInputChange} />
                        </div>


                        <TextArea label="Notes" field="notes" handleInputChange={handleInputChange} />
                    </div>
                </div>
            </div >}
        />
    )
}


export default ApplicationCreate;


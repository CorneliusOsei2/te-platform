import { useCallback, useEffect, useState } from "react";
import { DocumentIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import axiosInstance from "../../axiosConfig";
import SlideOverForm from "../custom/SlideOver/SlideOverCreate";
import { useData } from "../../context/DataContext";
import { FormInput, FormSelect, FormTextArea } from "../custom/FormInputs";
import { setNestedPropertyValue } from "../../utils";
import MissingData from "../custom/Alert/MissingData";


const ReferralCreate = ({ action, resumes, company, referralCompanyId, setReferralCompanyId }) => {

    const [referralData, setReferralData] = useState({ "company_id": referralCompanyId, "resume": "", "notes": "" });

    const createReferralRequest = async () => {
        await axiosInstance.post("/companies.create", referralData)
            .then((response) => {
                let data = response.data;
                console.log(data)
            })
            .catch((error) => {
                console.log("Error!");
            });
    }

    const handleInputChange = ({ field, value }) => {
        setReferralData((prevAppData) =>
            setNestedPropertyValue({ ...prevAppData }, field, value)
        );
    };

    console.log(action)

    return (
        <>
            {
                <SlideOverForm
                    title={"Request Referral"}
                    setHandler={setReferralCompanyId}
                    requestHandler={createReferralRequest}
                    children={
                        action ?
                            <MissingData info={action} /> :
                            (<div className="px-3 mt-6 space-y-6 ">
                                <div>
                                    <div className="mt-2 flex rounded-md shadow-sm">
                                        <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <img className="h-5 w-5 rounded-full" src={company.image} alt="" />
                                            </div>
                                            <input
                                                type="text"
                                                name="company"
                                                id="company"
                                                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 disabled:cursor-not-allowed text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={company.name}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>

                                <FormSelect
                                    label={"Select Resume"}
                                    field={"resume"} data={resumes.map((resume) => (resume.name))}
                                    handleInputChange={handleInputChange}
                                    required={true}
                                />

                                <FormTextArea
                                    label={"Notes"}
                                    field={"request_notes"}
                                    handleInputChange={handleInputChange}
                                />
                            </div>)
                    }
                />}
        </>
    )
}

export default ReferralCreate;
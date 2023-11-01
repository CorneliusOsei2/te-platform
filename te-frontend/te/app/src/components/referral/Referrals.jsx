import { useEffect, useCallback } from 'react'
import axiosInstance from '../../axiosConfig'
import { useAuth } from '../AuthContext'
import { useData } from '../DataContext'

const referral_statuses = {
    "Requested": "bg-blue-50 text-blue-700  ring-blue-600/20",
    "Completed": "bg-green-50 text-green-700  ring-green-600/20",
    "In review": "bg-green-50 text-green-700  ring-green-600/20",
}

const referral_action = (status, resumes, essay, contact) => {
    if (status !== null) {
        switch (status) {
            case "Completed":
                return "Referral completed. Hope you get the offer!";
            case "Requested":
                return "Request sent. Thank you!"
            case "In review":
                return "Please make sure all needed materials are uploaded."
            default:
                return ""
        }
    }
    else {
        if (!(resumes || essay || contact)) {
            return "Please upload your resume, essay and contact before requesting."
        }
        else if (!(resumes || essay)) {
            return "Please upload your resume and essay."
        }
        else if (!(resumes || contact)) {
            return "Please upload your resume and contact."
        }
        else if (!(essay || contact)) {
            return "Please upload your essay and contact."
        }
        else if (!resumes) {
            return "Please upload your resume"
        }
        else if (!essay) {
            return "Please upload your essay."
        }
        else if (!contact) {
            return "Please upload your contact."
        }
    }
}

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const Referrals = ({ essay, resumes, contact }) => {
    const { accessToken } = useAuth();
    const { fetchReferralCompanies, setFetchReferralCompanies, referralCompanies, setReferralCompanies } = useData();


    const referralCompaniesRequest = useCallback(() => {
        axiosInstance.get("companies.referrals.list", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                console.log(response.data.companies);
                setReferralCompanies(response.data.companies);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    useEffect(() => {
        if (fetchReferralCompanies) {
            referralCompaniesRequest();
            setFetchReferralCompanies(false);
        }
    }, [fetchReferralCompanies, referralCompaniesRequest, setFetchReferralCompanies]);

    return (
        <>
            <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Resume and Essay (Cover Letter)</h1>
            </header>

            <div className="px-4 sm:px-6 lg:px-8">

                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Company
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Requirements
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {referralCompanies.map((company) => (
                                    <tr key={company.email}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="mr-3">
                                                    <img className="h-5 w-5 rounded-full" src={company.image} alt="" />
                                                </div>
                                                <div className="font-medium text-gray-900">{company.name}</div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap text-left px-3 py-5 text-sm text-gray-500">
                                            <ul>
                                                {company.referral_materials.resume && <li>Resume</li>}
                                                {company.referral_materials.essay && <li>Essay</li>}
                                                {company.referral_materials.contact && <li>Phone number</li>}
                                            </ul>
                                        </td>
                                        <td className="whitespace-nowrap text-left px-3 py-5 text-sm text-gray-500">
                                            {
                                                company.referral ?
                                                    <span className={classNames(referral_statuses[company.referral ? company.referral.status : "None"], "inline-flex text-left rounded-full  px-2 py-1 text-xs font-medium ring-1 ring-inset ")}>
                                                        {company.referral.status}
                                                        {company.role}
                                                    </span>
                                                    :
                                                    <button className="inline-flex text-left rounded-full  px-2 py-1 text-xs font-medium ring-1 ring-inset" onClick={referralCompaniesRequest}>
                                                        Request
                                                    </button>
                                            }
                                        </td>
                                        <td className="whitespace-nowrap text-left px-3 py-5 text-sm text-gray-500">
                                            <span>{referral_action(company.referral ? company.referral.status : null, resumes.length > 0, essay !== "", contact !== "")} </span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Referrals;
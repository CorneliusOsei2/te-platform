import { useEffect, useCallback, useState } from 'react'
import axiosInstance from '../axiosConfig'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import ReferralCreate from '../components/referral/ReferralCreate'
import { XMarkIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import MenuViewOptionsDropdown from '../components/custom/MenuViewOptionsDropdown'
import { Loading } from '../components/custom/Loading'
import ReferralActivity from '../components/referral/ReferralActivity'


const Referrals = () => {
    const { accessToken, userId } = useAuth();
    const {
        setReferrals,
        fetchReferralCompanies,
        setFetchReferralCompanies,
        referralCompanies,
        setReferralCompanies,
        resumes,
        essay,
        contact
    } = useData();

    const [shownCompanies, setShownCompanies] = useState(referralCompanies);
    const [referralCompanyId, setReferralCompanyId] = useState(null);
    const [referralIndex, setReferralIndex] = useState(null);

    const [userReferralCompanies, setUserReferralCompanies] = useState([]);

    const getReferralCompaniesRequest = useCallback(async () => {
        await axiosInstance.get("companies.referrals.list", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setReferralCompanies(response.data.companies);
                console.log(response.data.companies)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [accessToken, setReferralCompanies]);

    const getUserReferralCompaniesRequest = useCallback(async () => {
        await axiosInstance.get(`users.${userId}.referrals.list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setReferrals(response.data.referrals);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [accessToken, setReferrals, userId]);


    useEffect(() => {
        const fetchData = async () => {
            await getReferralCompaniesRequest();
            await getUserReferralCompaniesRequest();
            setTimeout(() => setFetchReferralCompanies(false), 1000);
        }
        if (fetchReferralCompanies && accessToken) {
            fetchData();
        }
    }, [accessToken, fetchReferralCompanies, setFetchReferralCompanies, getReferralCompaniesRequest, getUserReferralCompaniesRequest]);

    return (
        <>
            <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Resume and Essay (Cover Letter)</h1>
            </header>

            {fetchReferralCompanies && <Loading />}

            {
                (!fetchReferralCompanies && !accessToken) &&
                <div className="flex flex-col  justify-center '">
                    <button
                        type="button"
                        className="mt-12 mx-auto w-36 justify-center px-3 flex rounded-full py-1 text-sm font-medium ring-1 ring-inset  bg-sky-700 text-white hover:bg-white hover:text-sky-700"
                    >
                        Log In
                    </button>

                </div>
            }

            {(!fetchReferralCompanies && accessToken) &&
                <>
                    <div className="lg:w-3/6 overflow-hidden">
                        <div className="px-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block w-full lg:w-11/12 py-2 align-middle sm:px-6 lg:px-8">
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
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {referralCompanies.map((company, index) => (
                                            <tr key={company.id}>
                                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                    <div className="flex items-center">
                                                        <div className="mr-3">
                                                            <img className="h-5 w-5" src={company.image} alt="" />
                                                        </div>
                                                        <div className="font-medium text-gray-900">{company.name}</div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap text-left px-3 py-5 text-sm text-gray-500">
                                                    <ul>
                                                        {company.referral_materials.resume &&
                                                            <li key="resume" className='flex'> {resumes.length !== 0 ?
                                                                <CheckCircleIcon className='text-green-600 mt-1' width="15" height="15" /> :
                                                                <XCircleIcon className='text-red-600 mt-1' width="15" height="15" />}
                                                                Resume
                                                            </li>}
                                                        {company.referral_materials.essay &&
                                                            <li key="essay" className='flex'> {essay.length !== 0 ?
                                                                <CheckCircleIcon className='text-green-600 mt-1' width="15" height="15" /> :
                                                                <XCircleIcon className='text-red-600 mt-1' width="15" height="15" />}
                                                                Essay
                                                            </li>}
                                                        {company.referral_materials.contact &&
                                                            <li key="contact" className='flex'> {contact.length !== 0 ?
                                                                <CheckCircleIcon className='text-green-600 mt-1' width="15" height="15" /> :
                                                                <XCircleIcon className='text-red-600 mt-1' width="15" height="15" />}
                                                                Contact
                                                            </li>}
                                                    </ul>
                                                </td>
                                                <td className="whitespace-nowrap text-left px-3 py-5 text-sm text-gray-500">
                                                    <button
                                                        className="inline-flex text-left rounded-full  px-2 py-1 text-xs font-medium ring-1 ring-inset"
                                                        onClick={() => {
                                                            setReferralIndex(index);
                                                            setReferralCompanyId(company.id)
                                                        }}>
                                                        Request
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <ReferralActivity referrals={userReferralCompanies ?? []} />

                    {
                        referralCompanyId &&
                        <ReferralCreate
                            resumes={resumes}
                            company={referralCompanies[referralIndex]}
                            referralCompanyId={referralCompanyId}
                            setReferralCompanyId={setReferralCompanyId}
                        />
                    }
                </>
            }
        </>
    )
}


export default Referrals;
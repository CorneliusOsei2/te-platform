import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import { useAuth } from '../AuthContext'

const companies = [
    {
        name: 'Lindsay Walton',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        requirements: ["Resume", "Essay / Cover letter"]
    },

]

const Referrals = ({ essay, resume }) => {
    const { accessToken } = useAuth();
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axiosInstance.get("/applications.list", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setCompanies(response.data["companies"].filter((comp) => comp.can_refer === true))
            })
            .catch((error) => {
                console.log(accessToken)
                console.log(error);
            })
    }, [accessToken])

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
                                {companies.map((company) => (
                                    <tr key={company.email}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img className="h-11 w-11 rounded-full" src={company.image} alt="" />
                                                </div>
                                                <div className="font-medium text-gray-900">{company.name}</div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap text-left px-3 py-5 text-sm text-gray-500">
                                            {
                                                company.requirements.map((req) => <div>{req}</div>)
                                            }
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Active
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{company.role}</td>

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
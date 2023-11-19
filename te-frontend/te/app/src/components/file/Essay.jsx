
import { Tab } from '@headlessui/react'
import { useEffect, useState, useCallback } from 'react'
import { XMarkIcon, ClipboardIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon, PencilIcon } from '@heroicons/react/20/solid'
import { copyTextToClipboard } from '../../utils'
import { useData } from '../../context/DataContext'
import axiosInstance from '../../axiosConfig'
import { useAuth } from '../../context/AuthContext'
import MissingData from '../custom/Alert/MissingData'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Essay = () => {
    const { userId, accessToken } = useAuth();
    const { essay, setEssay, fetchEssay, setFetchEssay } = useData();
    const [updateEssay, setUpdateEssay] = useState(false);
    const [essayBody, setEssayBody] = useState(essay);


    const updateEssayRequest = async () => {
        await axiosInstance.post(`/users.${userId}.essay`,
            { "essay": essayBody },
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((request) => {
                console.log(request.data)
                setEssay(essayBody);
                console.log(essay)
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const essayRequest = useCallback(async () => {
        await axiosInstance.get(`/users.${userId}.essay`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setEssay(response.data.essay);
            })
            .catch((error) => {
                console.log(error);
            })
    });

    useEffect(() => {
        if (fetchEssay && accessToken) {
            essayRequest();
            setFetchEssay(false);
        }
    }, [accessToken, essayRequest, fetchEssay, setFetchEssay])

    return (
        <form action="#">
            <Tab.Group>
                <>
                    <Tab.List className="flex justify-between">
                        {updateEssay && <Tab
                            className="text-gray"
                            onClick={(_) => setUpdateEssay(false)}
                        >
                            <div className="flex items-center gap-x-1 text-sm font-medium leading-6 text-slate-600">
                                <span>Cancel</span>
                                <XMarkIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                            </div>
                        </Tab>}

                        {!updateEssay && <Tab
                            className="text-gray flex w-full "
                            onClick={(_) => setUpdateEssay(true)}
                        >
                            <div className="flex  text-sm font-medium leading-6 text-slate-600">
                                <div className="flex">

                                    <span className='text-base ml-3 mr-3 underline text-sky-600 decoration-slate-700/[.66] decoration-wavy' >
                                        Click to edit cover letter
                                    </span>
                                    <PencilIcon className="h-5 w-5 text-slate-700" aria-hidden="true" />
                                </div>
                            </div>
                        </Tab>}

                        {essay && <div className='flex flex-rowright-0'>
                            <button onClick={() => copyTextToClipboard(essay)} ><ClipboardIcon className="h-5 w-5 text-green-600" />
                            </button>
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75">
                                </span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500">
                                </span>
                            </span>
                        </div>}
                    </Tab.List>

                    {!updateEssay &&
                        <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                            <div className="border-b">
                                <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                                    {essay !== "" ? <p>{essay}</p> : <div className="flex-shrink-0">
                                        <MissingData info="No cover letter added." />
                                    </div>}
                                </div>
                            </div>
                        </Tab.Panel>
                    }

                    {updateEssay &&
                        <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                            <div>
                                <textarea
                                    rows={10}
                                    cols={100}
                                    name="comment"
                                    id="comment"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={essay}
                                    onChange={(e) => { setEssayBody(e.target.value) }}
                                />
                                <div className="mt-2 flex justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-700 shadow-sm hover:bg-yellow-500 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={(_) => { setUpdateEssay(false); updateEssayRequest(); }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Tab.Panel>
                    }

                </>
            </Tab.Group>

        </form>
    )
}


export default Essay;
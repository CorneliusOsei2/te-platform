
import { Tab } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { XMarkIcon, ClipboardIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon, PencilIcon } from '@heroicons/react/20/solid'
import { copyTextToClipboard } from '../../utils'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Essay = ({ essay, updateEssayRequest }) => {
    const [updateEssay, setUpdateEssay] = useState(false);
    const [letterBody, setLetterBody] = useState(essay)

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
                                    <span className='text-base underline decoration-sky-600/[.66] decoration-wavy' >Click to edit cover letter</span>
                                    <PencilIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                </div>
                            </div>
                        </Tab>}

                        {letterBody && <button onClick={() => copyTextToClipboard(letterBody)} ><ClipboardIcon className="h-5 w-5 right-0" /></button>}
                    </Tab.List>


                    {!updateEssay &&
                        <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                            <div className="border-b">

                                <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                                    {essay ? <p>{essay}</p> : <div className="flex-shrink-0">
                                        <div className="mt-2 text-md text-yellow-700 flex">
                                            <ExclamationTriangleIcon className="  h-12 w-12 text-yellow-400" aria-hidden="true" />
                                            No cover letter currently. Please upload by clicking the Edit button. Thanks!
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </Tab.Panel>
                    }

                    {updateEssay &&
                        <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                            <div>
                                <textarea
                                    rows={5}
                                    cols={100}
                                    name="comment"
                                    id="comment"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={essay}
                                    onChange={(e) => { setLetterBody(e.target.value) }}
                                />
                                <div className="mt-2 flex justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-700 shadow-sm hover:bg-yellow-500 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={(_) => { updateEssayRequest(letterBody); setUpdateEssay(false) }}
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
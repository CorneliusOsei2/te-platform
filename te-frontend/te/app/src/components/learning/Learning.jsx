import { Fragment, useState, useCallback, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import LearningGroup from './LearningGroup'
import axiosInstance from '../../axiosConfig'
import { useAuth } from '../../context/AuthContext'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

let tmp = {
    "lessons": [
        { topic: "ABC", link: "a.com", playlist: "Data Structures and Algorithms" }
    ]
}

const Learning = () => {
    const { accessToken } = useAuth();
    const [workshops, setWorkshops] = useState([])
    const [dsa, setDsa] = useState([])
    const [sysDesign, setSysDesign] = useState([])


    let lessons = {
        "Workshops": [workshops, setWorkshops],
        "Data Structures and Algorithms": [dsa, setDsa],
        "System Design": [sysDesign, setSysDesign]
    }

    const workshopsRequest = useCallback(() => {
        axiosInstance.get("/learning.workshops.list", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setWorkshops(response.data.lessons)
            })
            .catch((error) => {
                console.log(error);
            })
    });

    useEffect(() => {
        workshopsRequest();
    })

    return (
        <div className="bg-white">
            <div>
                <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Learning</h1>
                </header>
            </div>

            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {
                        Object.entries(lessons).map(([title, groupStates]) => (
                            <Disclosure as="div" key={title} className="border-t border-gray-200 py-6">
                                {({ open }) => (
                                    <>
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{title}</span>
                                                <span className="ml-6 flex items-center">
                                                    {open ? (
                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                    ) : (
                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </h3>
                                        <Disclosure.Panel >
                                            <div className="space-y-6">
                                                <LearningGroup
                                                    title={title}
                                                    groupLessons={groupStates[0]}
                                                    playlists={groupStates[0].map((lesson) => lesson.playlist)}
                                                />
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))
                    }
                </main>

            </div>
        </div >
    )
}


export default Learning;
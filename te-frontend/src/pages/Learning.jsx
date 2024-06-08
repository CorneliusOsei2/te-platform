import { Fragment, useState, useCallback, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import LearningGroup from '../components/learning/LearningGroup'
import axiosInstance from '../axiosConfig'
import LessonCreate from '../components/learning/LessonCreate'
import { useData } from '../context/DataContext'
import { Loading } from '../components/_custom/Loading'
import LessonEntry from '../components/learning/LessonEntry'

let baseCategories = {
    "Programming Fundamentals": ["Python Programming", "Recursion", "Classes and Objects", "Mutability"],
    "Data Structures and Algorithms": ["Arrays and Lists", "Stacks, Queues, Deques", "Linked List", "Trees",
        "Priority Queue and Heaps", "Tries", "Graphs", "Pointers", "Intervals", "Bit Manipulation"],
    "System Design": ["Components"]
};

let lessonCategories = {
    "Workshops": { ...baseCategories, },
    "Data Structures and Algorithms": baseCategories['Data Structures and Algorithms'],
    "System Design": baseCategories['System Design']
}

const mapSubCategoryToLessons = (lessons, property) => {
    return lessons.reduce((acc, lesson) => {
        if (!acc[lesson[property]]) {
            acc[lesson[property]] = [];
        }
        acc[lesson[property]].push(lesson);
        return acc;
    }, {});
};


const Learning = () => {
    const { fetchLessons, setFetchLessons, dsa, setDsa, workshopLessons, setWorkshopLessons, otherLessons, setOtherLessons } = useData();

    const [addLesson, setAddLesson] = useState(false);

    const getLessonsRequest = useCallback(async () => {
        axiosInstance.get("/learning.lessons.list")
            .then((response) => {
                console.log(response)
                setDsa(response.data.dsa)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [setDsa]);


    useEffect(() => {
        const fetchData = async () => {
            if (fetchLessons) {
                await getLessonsRequest();
                setTimeout(() => setFetchLessons(false), 700);
            }
        };

        if (fetchLessons) {
            fetchData();
        }
    }, [fetchLessons, getLessonsRequest, setFetchLessons]);

    return (
        <div className="bg-white">
            <div>
                <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Learning</h1>
                    {
                        !fetchLessons &&
                        <button
                            type="button"
                            className="mx-auto mt-1 animate-bounce rounded-full bg-green-400 p-1 text-gray-900 shadow-sm hover:bg-green-600 hover:animate-none"
                            onClick={() => setAddLesson(true)}
                        >
                            <PlusIcon className="h-5 w-5 " aria-hidden="true" />
                        </button>
                    }
                </header>
            </div>

            {fetchLessons && <Loading />}

            {!fetchLessons &&
                <div>
                    <div className="rounded-md bg-yellow-50 w-1/2 mx-auto mb-3 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">                                        Please open the page on a larger screen like a computer for better experience.
                                </h3>

                            </div>
                        </div>
                    </div>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {
                            <Disclosure as="div" key="Workshops" className="border-t border-gray-200 py-6">
                                {({ open }) => (
                                    <>
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">Workshops</span>
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
                                                {Object.keys(workshopLessons).map((subcategory, index) => {
                                                    return (
                                                        < LearningGroup
                                                            subcategory={subcategory}
                                                            rawLessons={workshopLessons[subcategory]}
                                                            key={index}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        }


                        {
                            Object.entries(lessonCategories)
                                .filter((([cat, _]) => cat !== "Workshops"))
                                .map(([subcategory, _]) => (
                                    <Disclosure as="div" key={subcategory} className="border-t border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{subcategory}</span>
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
                                                    <div className="flex-col">
                                                        <p className="flex bold flex-col items-start text-green-700">Textbook: Common Sense Guide to Data Structures and Algorithms by Jay Wengrow</p>
                                                        <LessonEntry dsa={dsa} />
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))
                        }

                        {addLesson && <LessonCreate setAddLesson={setAddLesson} lessonCategories={lessonCategories} />}
                    </main>

                </div>}
        </div >
    )
}


export default Learning;
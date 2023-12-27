import { Fragment, useState, useCallback, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import LearningGroup from '../components/learning/LearningGroup'
import axiosInstance from '../axiosConfig'
import { useAuth } from '../context/AuthContext'
import LessonCreate from '../components/learning/LessonCreate'
import { useData } from '../context/DataContext'
import { Loading } from '../components/_custom/Loading'

let baseCategories = {
    "Fundamentals": ["Recursion", "Classes and Objects", "Mutability"],
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
    const { accessToken } = useAuth();
    const { fetchLessons, setFetchLessons, workshopLessons, setWorkshopLessons, otherLessons, setOtherLessons } = useData();

    const [addLesson, setAddLesson] = useState(false);


    const getLessonsRequest = useCallback(async () => {
        axiosInstance.get("/learning.lessons.list")
            .then((response) => {
                const workshops = response.data.lessons.filter((lesson) => lesson.category === "Workshops");
                const otherLessons = response.data.lessons.filter((lesson) => lesson.category !== "Workshops")
                console.log(response.data, workshops, otherLessons)
                setWorkshopLessons(mapSubCategoryToLessons(workshops, "subcategory"));
                setOtherLessons(mapSubCategoryToLessons(otherLessons, "category"));
            })
            .catch((error) => {
                console.log(error);
            })
    }, [setOtherLessons, setWorkshopLessons]);


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
    }, [accessToken, fetchLessons, getLessonsRequest, setFetchLessons]);

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
                                                    <div className="space-y-6">
                                                        <LearningGroup
                                                            subcategory=""
                                                            rawLessons={otherLessons[subcategory] ?? []}
                                                        />
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
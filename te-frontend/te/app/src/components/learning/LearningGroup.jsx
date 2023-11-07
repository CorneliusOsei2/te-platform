import { ChevronDownIcon, ArrowDownCircleIcon } from '@heroicons/react/20/solid'

const lessons = [
    { topic: 'Lindsay Walton', duration: 'Front-end Developer', year: 'lindsay.walton@example.com', download: 'Member' },
    { topic: 'Lindsay Walton', duration: 'Front-end Developer', year: 'lindsay.walton@example.com', download: 'Member' },
    { topic: 'Lindsay Walton', duration: 'Front-end Developer', year: 'lindsay.walton@example.com', download: 'Member' },
    // More lessons...
]

const LearningGroup = ({ title, items }) => {

    const sortLessons = (field) => {

    }

    return (
        <div className="px-6">
            <div className="border-b border-white /5">
                <h5 className="text-left text-sm  text-sky-500">{title}</h5>
            </div>

            <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="w-5/6">
                            <thead>
                                <tr >
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        <a href="#" className="group inline-flex">
                                            Topic
                                            <button className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" onClick={() => sortLessons("topic")}>
                                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </a>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <a href="#" className="group inline-flex">
                                            Duration
                                            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                <ChevronDownIcon
                                                    className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </a>
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <a href="#" className="group inline-flex">
                                            Year
                                            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                <ChevronDownIcon
                                                    className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </a>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" bg-white">
                                {lessons.map((lesson) => (
                                    <tr key={lesson.topic} className="text-left">
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-900 sm:pl-0">
                                            {lesson.topic}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lesson.duration}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lesson.year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LearningGroup;
import { ChevronDownIcon, ArrowDownCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState, Fragment } from 'react';
import { sortByField } from '../../utils';


const LearningGroup = ({ title, groupLessons, playlists }) => {
    let [lessons, setLessons] = useState(groupLessons);

    const [asc, setAsc] = useState(true);
    const [sortFied, setSortField] = useState("")

    const mapPlaylistsToLessons = (lessons) => {
        return lessons.reduce((acc, lesson) => {
            if (!acc[lesson.playlist]) {
                acc[lesson.playlist] = [];
            }
            acc[lesson.playlist].push(lesson);
            return acc;
        }, {});
    };
    let playlistToLessons = mapPlaylistsToLessons(groupLessons)

    const sortLessons = (field, asc) => {
        let sortedLessons = sortByField(lessons, field, asc === true ? "asc" : "desc");
        setLessons(sortedLessons)
    }

    return (
        <div className="px-6 mt-3">
            <>

                <div className="flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="w-4/6">
                                <thead>
                                    <tr >
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-0">
                                            <a href="#" className="group inline-flex">
                                                Topic
                                                <button className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" onClick={() => sortLessons("topic")}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </a>
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-0">
                                            <a href="#" className="group inline-flex">
                                                Link
                                                <button className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" onClick={() => sortLessons("topic")}>
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </a>
                                        </th>
                                        {title === "Workshops" && <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-500">
                                            <a href="#" className="group inline-flex">
                                                Year
                                                <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                                    <ChevronDownIcon
                                                        className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </a>
                                        </th>}
                                    </tr>
                                </thead>
                                <tbody className=" bg-white">
                                    {
                                        Object.entries(playlistToLessons).map(([playlist, lessons]) => (
                                            <Fragment key={playlist}>
                                                <tr className="border-t border-gray-200">
                                                    <th
                                                        colSpan={5}
                                                        scope="colgroup"
                                                        className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                                    >
                                                        <div className="border-b border-white /5">
                                                            <h5 className="text-left text-sm  text-sky-500">{playlist}</h5>
                                                        </div>
                                                    </th>
                                                </tr>
                                                {lessons.map((lesson) => (
                                                    <tr key={title + "." + lesson.topic} className="text-left left-3">
                                                        <td className=" break-words w-1/2 py-4 pl-3 pr-3 text-sm  text-gray-900 sm:pl-0">
                                                            {lesson.topic}
                                                        </td>
                                                        <td className=" w-1/4 py-4 text-sm text-blue-500">
                                                            <a className='visited:text-purple-600 decoration-dotted underline hover:text-green-600' href={lesson.link}>
                                                                {lesson.format === "video" ? "Video" : lesson.format === "pdf" ? "Document" : "Web page"}
                                                            </a>
                                                        </td>
                                                        {title === "Workshops" && <td className=" w-1/4 py-4 text-sm text-gray-500">{lesson.year}</td>}
                                                    </tr>
                                                ))}
                                            </Fragment>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}


export default LearningGroup;
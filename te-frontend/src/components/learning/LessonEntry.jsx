const LessonEntry = ({ lesson, dsa }) => {

    return (

        <div className="flex flex-col items-start mt-3 mb-3">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-3 py-3.5 text-left  font-semibold text-gray-900">
                                        Status
                                    </th>
                                    <th scope="col" className="px-autopy-3.5 text-left  font-semibold text-gray-900">
                                        Data Structure
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left  font-semibold text-gray-900">
                                        Prerequisites
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left  font-semibold text-gray-900">
                                        Resources
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y items-start text-left divide-gray-200 bg-white">
                                {Object.entries(dsa).map(([title, info]) => (
                                    <tr key={title}>
                                        <td className="whitespace-nowrap py-5 pl-3 pr-4 font-medium sm:pr-0">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="whitespace-nowrap flex  py-5  text-gray-500">
                                            <div className="text-yellow-900">{title}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5   text-gray-500">
                                            <div className="text-gray-700">{info.prereqs}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5  text-gray-500">
                                            {info.resources.map((resource) => (
                                                <div className="">
                                                    <div className="flex flex-col">
                                                        <a href={resource.link}>

                                                            <p className="border-dashed  hover:text-sky-600"> {resource.label}
                                                                <span className="text-sky-600 ml-2"> {resource.type}</span>
                                                            </p>
                                                        </a>

                                                    </div></div>
                                            ))}

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default LessonEntry
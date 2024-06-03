const LessonEntry = ({ lesson }) => {

    return (

        <div className="flex flex-col items-start mt-3 mb-2 ml-3">

            <p className="font-bold bold text-green-700">{lesson.title} <span className="italic ml-2 text-black"> (prereqs: {lesson.prereqs.join(" ")})</span></p>


            {lesson.resources.map((resource) => (
                <div className="ml-2">
                    <div className="flex flex-col">
                        <a href={resource.link}>

                            <p className="border-dashed border-b font-semibold border-slate-400 hover:text-sky-600"> {resource.label}
                                <span className="text-sky-600 ml-2">{resource.type}</span>
                            </p>
                        </a>

                    </div></div>
            ))}

        </div>
    )
}

export default LessonEntry
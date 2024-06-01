const LessonEntry = ({ lesson }) => {

    return (<>

        <h3>{lesson.title}</h3>

        {lesson.resources.map((resource) => (
            <> {resource.name}</>
        ))}


    </>)
}

export default LessonEntry
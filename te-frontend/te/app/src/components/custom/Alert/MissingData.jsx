import { ExclamationTriangleIcon, PencilIcon } from '@heroicons/react/20/solid'

const MissingData = ({ info }) => {

    return (
        <div className="mt-2 text-md text-yellow-700 flex mx-auto">
            <ExclamationTriangleIcon className="  h-12 w-12 text-yellow-400" aria-hidden="true" />
            <div className="text-lg my-auto">{info}</div>
        </div>
    )
}


export default MissingData;
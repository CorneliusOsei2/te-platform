import { ExclamationTriangleIcon, PencilIcon } from '@heroicons/react/20/solid'

const MissingData = ({ info }) => {

    return (
        <div className="mt-24  mx-6 border-b-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex flex-col items-center">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-md text-yellow-700">
                        {info}
                    </p>
                </div>
            </div>
        </div>
    )
}


export default MissingData;
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useData } from '../../context/DataContext';

const Profile = () => {
    const { user } = useData();

    return (
        <>
            <header className="flex items-center justify-between border-b border-white /5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                <h1 className="text-base ml-4  font-semibold leading-7 text-cyan-800">Profile</h1>
            </header>
            <div className='mx-6 max-w-3xl mt-3 text-left'>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">{user?.full_name}</h3>
                </div>
                <div className="mt-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-blue-600">Full name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Margot Foster</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-blue-600">Interests</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">Backend Developer</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-blue-600">Email address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">margotfoster@example.com</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-blue-600">Phone number</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">$120,000</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-blue-600">University</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{user?.university}</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-blue-600">Company (if employed)</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">{user?.company}</dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-blue-600">About</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                                pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                            </dd>
                        </div>

                    </dl>
                </div>
            </div>

        </>
    )
}

export default Profile;
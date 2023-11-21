import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, TrashIcon, FolderIcon } from '@heroicons/react/24/outline'


const SlideOverUpdate = ({ title, setHandler, children, updateHandler }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        let timeoutId;
        if (open === false) {
            timeoutId = setTimeout(() => {
                setHandler(null);
            }, 700);
        }
        return () => clearTimeout(timeoutId);
    }, [open, setHandler]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
                <div className="fixed inset-0" />
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                        <div className="h-0 flex-1 overflow-y-auto">
                                            <div className="bg-sky-800 px-4 py-6 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                        {title}
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative rounded-md bg-sky-800 text-sky-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                            onClick={() => { setOpen(false); }}
                                                        >
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {children}

                                            <div className="flex bottom-0 text-center justify-between px-12">
                                                <button
                                                    type="button"
                                                    className="ml-3   justify-between px-3 flex w-1/3 rounded-full py-1 text-sm font-medium ring-1 ring-inset text-green-500 bg-green-400/10 ring-gray-400/20 hover:bg-green-700 hover:text-white"
                                                    onClick={updateHandler}
                                                >
                                                    Save <FolderIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ml-3 justify-between px-auto flex w-1/3 rounded-full py-1 px-2 text-sm font-medium ring-1 ring-inset text-red-500 bg-red-400/10 ring-red-400/20 hover:bg-green-700 hover:text-white"
                                                >
                                                    Close <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                                </button>

                                            </div>
                                        </div>
                                    </div >

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default SlideOverUpdate;
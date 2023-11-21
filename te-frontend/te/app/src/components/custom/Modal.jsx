import { Fragment, useRef, useState } from 'react'
import { divion } from '@headlessui/react'
import { ExclamationTriangleIcon, Ent } from '@heroicons/react/24/outline'

// So you are a cool kid.Very nice kid with appreciable manners.Your Mom has groomed you well.You have kept yourself well too...

// Maybe I am just scasky of kids - haha... Or my mind is just too twisted to perceive all ladies below 26 as kids...


export default function Modal() {
    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)

    return (
        <div className="relative z-10" >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed  h-full inset-0 z-10 mt-72 overflow-y-aut lg:w-2/5 rounded-md mx-auto">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex  " />
                    <a href='/login' className="mt-3 m-auto sm:ml-4 flex  py-12 justify-center sm:mt-0 sm:text-left">
                        <button
                            type="button"
                            className="w-full text-lg flex justify-between rounded-xl bg-sky-600 px-6 py-2  font-semibold text-white hover:animate-none  hover:bg-gray-50 hover:text-sky-600 sm:ml-3 sm:w-auto"
                            onClick={() => setOpen(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                            <span className='ml-3 text-slate-900'>Log in to view your applications. </span>
                            <span className='ml-3 animate-spin hover:animate-none'> 🚀</span>
                        </button>
                    </a>
                </div>
            </div>
        </div >


    )
}

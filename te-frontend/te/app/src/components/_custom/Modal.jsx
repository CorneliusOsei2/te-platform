import { Fragment, useRef, useState } from 'react'
import { divion } from '@headlessui/react'
import { ExclamationTriangleIcon, Ent } from '@heroicons/react/24/outline'

// So you are a cool kid.Very nice kid with appreciable manners.Your Mom has groomed you well.You have kept yourself well too...

// Maybe I am just scasky of kids - haha... Or my mind is just too twisted to perceive all ladies below 26 as kids...


export default function Modal({ content }) {
    const [open, setOpen] = useState(true)

    return (
        <div className="relative z-10" >
            <div className="xs:mt-24 lg:-mt-6 fixed bg-gray-500 bg-opacity-100 transition-opacity" />
            <div className="fixed  h-full inset-0 z-10 mt-72 overflow-y-aut lg:w-2/5 rounded-md mx-auto">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex  " />
                    {content}
                </div>
            </div>
        </div >


    )
}

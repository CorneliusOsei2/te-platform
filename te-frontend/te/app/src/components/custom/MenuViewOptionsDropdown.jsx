import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'


import { Bars3Icon, BriefcaseIcon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MenuViewOptionsDropdown = ({ sortOptions, handler }) => {
    return (
        <>
            <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-slate-600">
                    Sort by
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        {sortOptions.map((option) => (
                            <Menu.Item key={option}>
                                {({ active }) => (
                                    <a
                                        // href="/"
                                        className={classNames(
                                            active ? 'bg-gray-50' : '',
                                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                                        )}
                                        onClick={(e) => handler(e.target.innerText)}
                                    >
                                        {option}
                                    </a>
                                )}
                            </Menu.Item>
                        )
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default MenuViewOptionsDropdown;
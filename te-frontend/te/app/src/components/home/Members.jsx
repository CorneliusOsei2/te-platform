import { useState } from 'react'
import { leadership } from './data/leadership';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


const Members = () => {
  const [viewAllMembers, setViewAllMembers] = useState(false);

  const viewAllMembersHander = () => {
    setViewAllMembers(!viewAllMembers);
  }

  return (
    <div className="bg-sky-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-blue-200 sm:text-4xl">Meet our Leadership</h2>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {leadership.map((leader) => (
            <li key={leader.name} className="text-white">
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={leader.image} alt="" />
                <div className='text-left '>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-200 ">{leader.name}</h3>
                  <div>
                    <a href={leader.linkedIn}><FontAwesomeIcon icon={faLinkedin} size="1x" className='mr-3' /></a>
                    <a href={leader.gitHub}><FontAwesomeIcon icon={faGithub} size="1x" className='mr-3' /></a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}


export default Members;
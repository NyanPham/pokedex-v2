import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeightScale, faRulerVertical } from '@fortawesome/free-solid-svg-icons'
import DetailNavbar from './DetailNavbar'

export default function About({ weight, height, active }) {
    return (
        <>
            <div className={`${active === 'about' ? 'animate-flyIn': 'hidden' } w-80 p-3 bg-gray-900 mt-7 mx-auto rounded-xl flex flex-row text-gray-100 translate-y-12 opacity-0`}>
            <div className="grow">
                <div className="flex text-lg justify-center items-center gap-4 mb-2">
                    <FontAwesomeIcon icon={faWeightScale} className="text-2xl" />
                    Weight
                </div>
                {weight / 10}kg
                </div>
                <p className="self-center text-3xl">|</p>
                <div className="grow">
                    <div className="flex text-lg justify-center items-center gap-4 mb-2">
                        <FontAwesomeIcon icon={faRulerVertical} className="text-2xl" />
                        Height
                    </div>
                    {height / 10}m
                </div>
            </div>
        </>
        
    )
}

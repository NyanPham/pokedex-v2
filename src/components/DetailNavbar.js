import React from 'react'
import { capitalize } from '../helper'

export default function DetailNavBar({ active, setActive }) {
    return (
        <div className="mt-7 w-full flex justify-evenly items-center mx-auto text-lg text-gray-100 font-light">
            {['about', 'stats', 'moves', 'locations'].map(detail => (
                <button 
                    key={detail} 
                    name={detail}
                    className={`${detail === active ? 'font-semibold border-b-gray-100 border-b-2' : ''} pb-2 `}
                    onClick={(e) => setActive(e.target.name)}
                >
                    {capitalize(detail)}
                </button>
            ))}
        </div>
    )
}

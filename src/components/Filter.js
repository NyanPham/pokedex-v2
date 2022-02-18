import { faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Filter() {
    return (
        <button className="text-blue-300 mt-3 pb-3 w-full flex gap-2 items-center text-lg cursor-pointer hover:text-blue-400 active:text-blue-500 transition border-b border-b-gray-300">
            <FontAwesomeIcon icon={faSort} />
            <p>Filter</p>
        </button>
    )
}

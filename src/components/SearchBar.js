import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar() {
    return (
        <div className="bg-gray-400 py-2 px-3 flex text-lg">
            <label className="text-gray-100" htmlFor="search"><FontAwesomeIcon icon={faSearch} /></label>
            <input 
                className="ml-2 bg-transparent placeholder:text-gray-100 text-gray-100 outline-none border-none grow"
                type="text" 
                placeholder="Search Pokemon" 
                id="search"
            />
        </div>
    )
}

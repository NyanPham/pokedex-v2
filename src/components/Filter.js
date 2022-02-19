import { faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import AbilitySelect from './AbilitySelect'
import { capitalize } from '../helper'
import { usePokemons, ACTIONS } from '../hooks/usePokemon'

export default function Filter() {
    const [open, setOpen] = useState(false)
    const { state, dispatch } = usePokemons()
    const [allPokemons, setAllPokemons] = useState([])

    function handleCheckboxChange(e) {
        dispatch({
            type: ACTIONS.UPDATE_CHECKBOX,
            payload: {
                checkedType: e.target.id
            }
        })
    }

    function closeFilter() {
        setOpen(false)
    }

    function resetFilter() {
        dispatch({
            type: ACTIONS.RESET_CHECKBOX,
        })
        dispatch({
            type: ACTIONS.UPDATE_SELECTED_ABILITY,
            payload: {
                selectedAbility: 'All'
            }
        })
    }

    return (
        <div className="relative z-30">
            <button 
                className="text-blue-300 mt-3 pb-3 w-full flex gap-2 items-center text-lg cursor-pointer hover:text-blue-400 active:text-blue-500 transition border-b border-b-gray-300"
                onClick={() => setOpen(prevOpen => !prevOpen)}
            >
                <FontAwesomeIcon icon={faSort} />
                <p>Filter</p>
            </button>
            {open &&
                <div className="absolute top-12 left-0 w-full p-3 pb-7 bg-gray-400 text-gray-900">
                    <div className='w-full flex justify-between items-center pb-3 border-b border-b-gray-300'>
                        <button 
                            className="p-1 rounded-sm flex justify-center items-center hover:bg-gray-500 hover:text-gray-100 transition"
                            onClick={resetFilter}
                        >Reset</button>
                        <button 
                            className="w-5 h-5 rounded-sm text-2xl flex justify-center items-center hover:bg-gray-500 hover:text-gray-100 transition"
                            onClick={closeFilter}
                        >&times;</button>
                    </div>
                    <div className="mt-3 pb-3 border-b border-b-gray-300">
                        <h3 className="text-lg font-semibold">Ability</h3>
                        <AbilitySelect />
                    </div>
                    <div className="mt-3 w-full">
                        <h3 className="text-lg font-semibold">Type</h3>
                        <div className="grid grid-cols-3 justify-between text-sm items-center gap-y-2 gap-x-7 mt-3 w-full sm:text-base md:gap-x-32 lg:gap-x-52 lg:text-lg">
                            {state.searchedTypes.map(type => (
                                <div key={type.name} className="flex justify-between items-center">
                                    <label htmlFor={type.name}>{capitalize(type.name)}</label>
                                    <input 
                                        type="checkbox" 
                                        id={type.name} 
                                        checked={type.checked} 
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }   
        </div>
        
    )
}

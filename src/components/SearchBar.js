import React, { useState, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { usePokemons, ACTIONS } from '../hooks/usePokemon'

export default function SearchBar() {
    const { state, dispatch } = usePokemons()
    const [searchTerm, setSearchTerm] = useState('')
    const { searchedTypes, selectedAbility } = state
    const selectedTypes = useMemo(() => {
        return searchedTypes.filter(type => type.checked)
    }, [searchedTypes])
    const allPokemons = useMemo(() => {
        return state.allPokemons
    }, [state])

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        let foundPokemons = allPokemons
        if (searchTerm === '' && selectedTypes.length === 0) {
            dispatch({
                type: ACTIONS.UPDATE_SEARCH_RESULTS,
                payload: {
                    searchResults: []
                }
            })
            dispatch({
                type: ACTIONS.SET_SEARCHING,
                payload: {
                    isSearching: false
                }
            })
            return
        }
        if (searchTerm !== '' || searchTerm !== null) foundPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
        if (selectedTypes.length > 0) foundPokemons = foundPokemons.filter(pokemon => pokemon.types.some(type => selectedTypes.some(selectedType => selectedType.name.toLowerCase() === type.toLowerCase())))
        if (selectedAbility !== 'All')  foundPokemons = foundPokemons.filter(pokemon => pokemon.abilities.some(ability => ability.toLowerCase() === selectedAbility.toLowerCase()))
        dispatch({
            type: ACTIONS.UPDATE_SEARCH_RESULTS,
            payload: {
                searchResults: foundPokemons
            }
        })
        dispatch({
            type: ACTIONS.SET_SEARCHING,
            payload: {
                isSearching: true
            }
        })
    }, [searchTerm, selectedTypes, selectedAbility, allPokemons, dispatch])
    
    return (
        <div className="bg-gray-400 py-2 px-3 flex text-lg w-full">
            <label className="text-gray-100" htmlFor="search"><FontAwesomeIcon icon={faSearch} /></label>
            <input 
                className="ml-2 bg-transparent max-w-full placeholder:text-gray-100 text-gray-100 outline-none border-none grow"
                type="text" 
                placeholder="Search Pokemon" 
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    )
}

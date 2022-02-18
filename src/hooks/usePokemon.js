import React, { useReducer, useEffect, createContext, useContext } from 'react'
import { formatPokemon } from '../helper'
import { TYPES_COLOR_MAP } from '../components/TYPES_MAP'

const TOTAL_POKEMONS = 898
const types = Object.keys(TYPES_COLOR_MAP)
const initialCheckboxValues = types.map(type => {
    return {
        name: type,
        checked: false
    }
})


export const ACTIONS = {
    SET_POKEMONS: 'set-pokemons',
    SET_ALL_POKEMONS: 'set-all-pokemons',
    SET_PAGINATIONS: 'set-paginations',
    UPDATE_CHECKBOX: 'update-checkbox',
    UPDATE_SELECTED_ABILITY: 'update-selected-ability',
    UPDATE_SEARCH_RESULTS: 'update-search-results',
    SET_SEARCHING: 'set-searching',
    RESET_CHECKBOX: 'reset-checkbox'
}

const PokemonContext = createContext()
export const usePokemons = () => useContext(PokemonContext)


export async function getPokemons(url) {
    const rawData = await fetch(url)
    const JSON = await rawData.json()
    return {
        pokemonsArray: JSON.results,
        nextURL: JSON.next,
        previousURL: JSON.previous
    }
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SET_POKEMONS:
            console.log('triggered')
            return {
                ...state,
                pokemons: [...state.pokemons, ...payload.pokemons]
            }
        case ACTIONS.SET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: [...state.allPokemons, payload.pokemon]
            }
        case ACTIONS.SET_PAGINATIONS:
            return {
                ...state,
                nextURL: payload.nextURL,
                previousURL: payload.previousURL
            }
        case ACTIONS.UPDATE_CHECKBOX:
            const checkedType = state.searchedTypes.find(type => type.name === payload.checkedType)
            const index = state.searchedTypes.indexOf(checkedType)
            const newCheckedType = {
                ...checkedType,
                checked: !checkedType.checked
            }
            const newTypes = [
                ...state.searchedTypes.slice(0, index),
                newCheckedType,
                ...state.searchedTypes.slice(index + 1, state.searchedTypes.length)
            ]

            return {
                ...state,
                searchedTypes: newTypes
            }
        case ACTIONS.RESET_CHECKBOX:
            const types = [...state.searchedTypes]
            const resetTypes = types.map(type => {
                return {
                    name: type.name,
                    checked: false
                }
            })
            console.log(resetTypes)
            return {
                ...state,
                searchedTypes: resetTypes
            }
        case ACTIONS.UPDATE_SELECTED_ABILITY: 
            return {
                ...state,
                selectedAbility: payload.selectedAbility
            }
        case ACTIONS.UPDATE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: payload.searchResults
            }
        case ACTIONS.SET_SEARCHING:
            return {
                ...state,
                isSearching: payload.isSearching
            }
        default:
            return state
    }
}

export default function PokemonProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        pokemons: [],
        allPokemons: [],
        pagination: {
            nextURL: null,
            previousURL: null
        },
        searchedTypes: initialCheckboxValues,
        selectedAbility: 'All',
        searchResults: [],
        isSearching: false
    })
    
    useEffect(() => {
        getPokemons('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
            .then(({ pokemonsArray, nextURL, previousURL }) => {
                const pokemonsPromises = pokemonsArray.map(pokemon => formatPokemon(pokemon.url)) 
                Promise.all(pokemonsPromises)
                    .then((pokemons) => {
                        dispatch({
                            type: ACTIONS.SET_POKEMONS,
                            payload: { pokemons }
                        })
                        dispatch({
                            type: ACTIONS.SET_PAGINATIONS,
                            payload: { nextURL, previousURL }
                        })
                    })
            })
    }, [dispatch])

    useEffect(async () => {
        for (let i = 1; i <= TOTAL_POKEMONS; i++) {
            const pokemon = await formatPokemon(`https://pokeapi.co/api/v2/pokemon/${i}`)
            dispatch({
                type: ACTIONS.SET_ALL_POKEMONS,
                payload: {
                    pokemon
                }
            })
        }
    }, [dispatch])

    const value = {
        state,
        dispatch
    }

    return (
        <PokemonContext.Provider value={value}>
            {children}
        </PokemonContext.Provider>
    )
}
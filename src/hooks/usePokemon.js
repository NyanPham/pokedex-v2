import React, { useReducer, useEffect, createContext, useContext } from 'react'
import { formatPokemon } from '../helper'

export const ACTIONS = {
    SET_POKEMONS: 'set-pokemons',
    SET_PAGINATIONS: 'set-paginations'
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
            return {
                ...state,
                pokemons: [...state.pokemons, ...payload.pokemons]
            }
        
        case ACTIONS.SET_PAGINATIONS:
            return {
                ...state,
                nextURL: payload.nextURL,
                previousURL: payload.previousURL
            }
        default:
            return state
    }
}

export default function PokemonProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        pokemons: [],
        pagination: {
            nextURL: null,
            previousURL: null
        }
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
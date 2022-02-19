import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PokemonCard from './PokemonCard'
import SearchBar from './SearchBar'
import { usePokemons, getPokemons, ACTIONS } from '../hooks/usePokemon'
import { formatPokemon } from '../helper'

const TOTAL_POKEMONS = 1126

export default function Home() {
    const { state, dispatch } = usePokemons()
    const { pokemons, nextURL } = state
    const [loading, setLoading] = useState(false)
    const { searchResults, isSearching } = state

    async function fetchMorePokemons() {
        
        try {
            setLoading(true)
            const result = await getPokemons(nextURL)
            const pokemonPromises = result.pokemonsArray.map((target) => formatPokemon(target.url))
            const formatedPokemons = await Promise.all(pokemonPromises)
            dispatch({
                type: ACTIONS.SET_POKEMONS,
                payload: {
                    pokemons: formatedPokemons
                }
            })
            dispatch({
                type: ACTIONS.SET_PAGINATIONS,
                payload: {
                    nextURL: result.nextURL,
                    previousURL: result.previousURL
                }
            })
        } catch {
            alert("There is an error loading more pokemons. Please try again later.")
        }
        
        setLoading(false)
        
    }

    return (
        <div className="p-4 bg-gray-200 min-h-screen">
            <SearchBar />
            <Filter />
            <div className="mt-3 flex justify-center items-center flex-wrap gap-3">
                {!isSearching && pokemons?.map((pokemon, index) => (
                    <PokemonCard
                        key={`${pokemon.name}_${index}`}
                        id={pokemon.id}
                        name={pokemon.name}
                        imageURL={pokemon.imageURL}
                        types={pokemon.types}
                    />
                ))}
                {isSearching && searchResults?.map((pokemon, index) => (
                    <PokemonCard
                        key={`${pokemon.name}_${index}`}
                        id={pokemon.id}
                        name={pokemon.name}
                        imageURL={pokemon.imageURL}
                        types={pokemon.types}
                    />
                ))}
            </div>
            {pokemons.length < TOTAL_POKEMONS && nextURL !== null && !isSearching && (
                <button 
                    className="p-2 mt-5 text-lg bg-sky-300 text-gray-100 text-center mx-auto block hover:-translate-y-1 hover:shadow-lg transform transition disabled:bg-slate-500"
                    onClick={fetchMorePokemons}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    )
}

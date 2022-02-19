import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { capitalize, formatPokemon } from '../helper'
import PokemonCard from './PokemonCard'


export default function Locations({ locations, active }) {
    const [open, setOpen] = useState(false)
    const [pokemons, setPokemons] = useState([])

    async function showOtherPokemonsInArea(url) {
        const locationRes = await fetch(url)
        const locationData = await locationRes.json()
        const pokemonEncounters = locationData.pokemon_encounters
        const pokemonResponses = await pokemonEncounters.map(async (pokemon) => {
            return await formatPokemon(pokemon.pokemon.url)
        })
        const areaPokemons = await Promise.all(pokemonResponses)
        setPokemons(areaPokemons)
        setOpen(true)
    }
    
    return (
        <div className={`${active === 'locations' ? 'animate-flyIn': 'hidden' } w-72 pt-3 py-3 space-y-5 bg-gray-900 mt-5 mx-auto rounded-xl flex flex-col text-gray-100 translate-y-12 opacity-0 sm:w-80 lg:space-y-7`}>
            {locations.length > 0 && locations.map((location, index) => (
                <p 
                    key={index}
                    className="w-72 py-2 mx-auto bg-gray-800 text-gray-100 rounded-lg tracking-wider hover:-translate-y-1 transform transition cursor-pointer sm:w-80"
                    onClick={() => showOtherPokemonsInArea(location.url)}
                >
                    {location.name.split('-').map(word => capitalize(word)).join(' ')}
                </p>
            ))}
            {locations.length === 0 && (
               <p 
                    className="w-72 py-2 mx-auto bg-gray-800 text-gray-100 rounded-lg tracking-wider hover:-translate-y-1 transform transition cursor-pointer sm:w-80"
                >
                    Locations Unknown
                </p> 
            )}
        </div>
    )
}

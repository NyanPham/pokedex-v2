import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom' 
import PokemonAbout from './PokemonAbout'
import DetailNavbar from './DetailNavbar'
import { TYPES_COLOR_MAP } from './TYPES_MAP'
import { capitalize, IDConverter, formatPokemonDetail } from '../helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PokemonDetail() {
    const [pokemon, setPokemon] = useState()
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState('about')
    const { pokemonId } = useParams()

    useEffect(async () => {
        try {
            const pokemonDetail = await formatPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            setPokemon(pokemonDetail)
        } catch {
            console.log('Failed to load in PokemonDetail')
        }
    }, [pokemonId])

    useEffect(() => {
        if (pokemon?.id) setLoading(false)
    }, [pokemon])

    return (
        <>
            {pokemon && !loading && (
                <div className="text-center bg-gray-800 p-5 h-screen overflow-hidden">
                    <h3 className="text-2xl text-gray-100 tracking-wide">{active === 'about' ? IDConverter(pokemon.id) : capitalize(pokemon.name)}</h3>
                    <div className="w-52 mx-auto relative flex justify-center items-center">
                        <img 
                            className='w-full h-full z-10'
                            src={pokemon.imageURL} 
                            alt={pokemon.name} 
                        />
                    </div> 
                    <h2 className={`${active === 'about' ? '' : 'hidden'} text-3xl text-gray-100 tracking-wide mt-2`}>{capitalize(pokemon.name)}</h2>
                    <div className={`${active === 'about' ? '' : 'hidden'} mt-5 w-64 flex flex-row gap-3 mx-auto justify-between items-center`}>
                        {pokemon.types.map((type, index) => {
                            const typeColors = TYPES_COLOR_MAP[type]
                            const borderColor = typeColors.border
                            const textColor = typeColors.textOutline
                            return  <div 
                                        key={`type_${index}`} 
                                        className={`${borderColor} ${textColor}  bg-transparent outline-none border-2 w-28 h-10 flex justify-center items-center gap-2 rounded-lg`}
                                    >
                                        <FontAwesomeIcon icon={typeColors?.icon || null} />
                                        {type} 
                                    </div>
                        })}
                    </div>
                    <PokemonAbout weight={pokemon.weight} height={pokemon.height} active={active} setActive={setActive}/>
                </div>
            )}
            {loading && <p>Loading...</p>}
        </>
    )
}

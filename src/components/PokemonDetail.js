import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom' 
import About from './About'
import Stats from './Stats'
import Moves from './Moves'
import Locations from './Locations'
import DetailNavbar from './DetailNavbar'
import { TYPES_COLOR_MAP } from './TYPES_MAP'
import { capitalize, IDConverter, formatPokemonDetail } from '../helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PokeBall from '../assets/pokeball.png'

export default function PokemonDetail() {
    const [pokemon, setPokemon] = useState()
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState('about')
    const { pokemonId } = useParams()

    useEffect(async () => {
        let isCancel = false
        try {
            const pokemonDetail = await formatPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            if (!isCancel) {
               setPokemon(pokemonDetail) 
            }
        } catch {
            console.log('Failed to load in PokemonDetail')
        }
        
        return () => {
            isCancel = true
        }
    }, [pokemonId])

    useEffect(() => {
        if (pokemon?.id) setLoading(false)
    }, [pokemon])
    
    return (
        <>
            {pokemon && !loading && (
                <div className="text-center bg-gray-800 p-5 min-h-screen relative">
                    <Link to="/" className="py-2 px-3 bg-gray-900 text-gray-200 absolute top-5 left-5 rounded-lg hover:bg-gray-700 hover:-translate-y-1 transform transition">Back</Link>
                    <h3 className="text-2xl text-gray-100 tracking-wide">{active === 'about' ? IDConverter(pokemon.id) : capitalize(pokemon.name)}</h3>
                    <div className="w-52 mx-auto relative flex justify-center items-center">
                        <img 
                            className='w-full h-full z-10'
                            src={pokemon.imageURL} 
                            alt={pokemon.name} 
                        />
                    </div> 
                    <h2 className={`${active === 'about' ? '' : 'hidden'} text-3xl text-gray-100 tracking-wide mt-2`}>{capitalize(pokemon.name)}</h2>
                    <div className={`${active === 'about' ? '' : 'hidden'} mt-5 w-64 flex flex-row gap-3 mx-auto justify-center items-center`}>
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
                    <div className={`${active === 'about' ? '' : 'bg-gray-900'} mt-7 w-80 mx-auto py-3 rounded-lg sm:w-96`}>
                        <DetailNavbar active={active} setActive={setActive}/>
                        <About weight={pokemon.weight} height={pokemon.height} active={active}/>
                        <Stats stats={pokemon.stats} active={active} type={pokemon.types[0]}/>
                        <Moves moves={pokemon.moves} active={active} type={pokemon.types[0]} />
                        <Locations locations={pokemon.locations} active={active} />
                    </div>
                </div>
            )}
            {loading &&
                <div className="fixed inset-0 bg-gray-800 flex items-center justify-center">
                    <div className="w-52 h-52 animate-spinner">
                        <img className="max-w-full max-h-full" src={PokeBall} alt='Pokeball' />
                    </div>
                </div>}
        </>
    )
}

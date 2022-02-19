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
    const [mainBackgroundColor, setMainBackgroundColor] = useState('')
    const [active, setActive] = useState('about')
    const { pokemonId } = useParams()

    useEffect(() => {
        let isCancel = false
        async function fetchPokemonDetail(pokemonId) {
            try {
                const pokemonDetail = await formatPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
                if (!isCancel) {
                setPokemon(pokemonDetail) 
                }
            } catch {
                console.log('Failed to load in PokemonDetail')
            }
        }
        
        fetchPokemonDetail(pokemonId)

        return () => {
            isCancel = true
        }
    }, [pokemonId])

    useEffect(() => {
        let isCancel = false
        if (pokemon?.id) {
            const mainType = pokemon?.types[0]
            const mainTypeColor = TYPES_COLOR_MAP[mainType]
            if (isCancel) return
            setMainBackgroundColor(mainTypeColor.background)
            setLoading(false)
        }
        return () => {
            isCancel = true
        }
    }, [pokemon])

    return (
        <>
            {pokemon && !loading && (
                <div className="bg-gray-800 p-5 min-h-screen relative">
                    <Link to="/" className="py-2 px-3 w-max bg-gray-900 text-gray-200 absolute block top-5 left-5 rounded-lg lg:sticky lg:top-7 lg:left-5 hover:bg-gray-700 hover:-translate-y-1 transform transition">Back</Link>
                    <div className="flex flex-col lg:flex-row">
                        <div className="text-center mt-7 lg:w-2/5  lg:mt-24 lg:h-screen lg:sticky lg:top-24">
                            <h3 className="text-2xl text-gray-100 tracking-wide lg:hidden">{active === 'about' ? IDConverter(pokemon.id) : capitalize(pokemon.name)}</h3>
                            <h3 className="text-2xl text-gray-100 tracking-wide hidden lg:block">{IDConverter(pokemon.id)}</h3>
                            <div className="w-52 mx-auto flex justify-center items-center relative lg:w-3/5">
                                <div className={`absolute -inset-1 ${mainBackgroundColor} rounded-full opacity-100 blur-2xl`}></div>
                                <img 
                                    className='w-full h-full z-10 relative'
                                    src={pokemon.imageURL} 
                                    alt={pokemon.name} 
                                />
                            </div> 
                            <h2 className={`${active === 'about' ? '' : 'hidden'} text-3xl text-gray-100 tracking-wide mt-2 lg:block`}>{capitalize(pokemon.name)}</h2>
                            <div className={`${active === 'about' ? '' : 'hidden'} mt-5 w-64 flex flex-row gap-3 mx-auto justify-center items-center lg:flex`}>
                                {pokemon.types.map((type, index) => {
                                    const typeColors = TYPES_COLOR_MAP[type]
                                    const borderColor = typeColors.border
                                    const textColor = typeColors.textOutline
                                    return  <div 
                                                key={`type_${index}`} 
                                                className={`${borderColor} ${textColor}  bg-transparent outline-none border-2 w-28 h-10 flex justify-center items-center gap-2 rounded-lg lg:w-32 lg:h-12 lg:text-xl`}
                                            >
                                                <FontAwesomeIcon icon={typeColors?.icon || null} />
                                                {type} 
                                            </div>
                                })}
                            </div>
                        </div>
                        <div className={`${active === 'about' ? '' : 'bg-gray-900'} mt-7 w-80 h-max mx-auto py-3 rounded-lg sm:w-96 overflow-y-hidden lg:w-1/2`}>
                            <DetailNavbar active={active} setActive={setActive}/>
                            <About weight={pokemon.weight} height={pokemon.height} active={active}/>
                            <Stats stats={pokemon.stats} active={active} type={pokemon.types[0]}/>
                            <Moves moves={pokemon.moves} active={active} type={pokemon.types[0]} />
                            <Locations locations={pokemon.locations} active={active} />
                        </div>
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

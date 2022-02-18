import React from 'react'
import { TYPES_COLOR_MAP } from './TYPES_MAP'
import { capitalize } from '../helper'
import { Link } from 'react-router-dom'

export default function PokemonCard({ id, name, imageURL, types }) {
    return (
        <Link to={`/pokemon/${id}`} className="w-36 h-40 p-2 rounded-md shadow-md bg-gray-100 space-y-1 group cursor-pointer inline-block">
            <h3 className="text-center text-lg text-blue-300">{capitalize(name)}</h3>
            <div className="w-20 h-20 mx-auto">
                <img className="w-full max-h-full group-hover:scale-110 transform transition" src={imageURL} alt={`pokemon_${name}`} />
            </div>
            <div className="flex gap-1 justify-between px-1">
                {types.map((type, index) => {
                    const currentTypeColor = TYPES_COLOR_MAP[type.toLowerCase()]
                    const backgroundColor = currentTypeColor.background
                    const textColor = currentTypeColor.text
                    return (
                        <p 
                            key={`${name}_type_${index}`}
                            className={`${backgroundColor} ${textColor} w-14 py-0.5 text-center rounded-sm text-sm`}
                        >
                            {type}
                        </p>
                    )
                })}
            </div>
        </Link>
    )
}

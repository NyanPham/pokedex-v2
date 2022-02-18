import React from 'react'
import { TYPES_COLOR_MAP } from './TYPES_MAP'
import { capitalize } from '../helper'

export default function Moves({ moves, active, type }) {
    const typeColor = TYPES_COLOR_MAP[type]
    const backgroundColor = typeColor.background
    
    return (
        <div className={`${active === 'moves' ? 'animate-flyIn': 'hidden' } w-80 pt-3 py-3 space-y-5 bg-gray-900 mt-5 mx-auto rounded-xl flex flex-col text-gray-100 translate-y-32 opacity-0`}>
            {moves.map((move, index) => (
                <div key={index} className={`w-80 p-2 grid grid-cols-2 items-center mx-auto rounded-lg ${backgroundColor}`}>
                    <h3 className="">{capitalize(move.name.split('-').join(' '))}</h3>
                    <div className="text-left text-sm">
                        <p>
                            Accurracy: 
                            <span className="font-semibold"> {move.accuracy  || 'unknown'}</span>
                        </p>
                        <p>
                            Power: 
                            <span className="font-semibold"> {move.power || 'unknown'}</span>
                        </p>
                        <p>
                            Type: 
                            <span className="font-semibold"> {move.type  || 'unknown'}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

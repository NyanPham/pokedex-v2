import React from 'react'
import { TYPES_COLOR_MAP } from './TYPES_MAP'
import MoveDetail from './MoveDetail'

export default function Moves({ moves, active, type }) {
    const typeColor = TYPES_COLOR_MAP[type]
    const backgroundColor = typeColor.background
    
    return (
        
        <div className={`${active === 'moves' ? 'animate-flyIn': 'hidden' } w-80 pt-3 py-3 space-y-5 bg-gray-900 mt-5 mx-auto rounded-xl flex flex-col text-gray-100 translate-y-12 opacity-0`}>
            {moves.map((move, index) => (
                <MoveDetail key={index} move={move} backgroundColor={backgroundColor} />
            ))}
        </div>
    )
}

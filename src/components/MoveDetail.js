import React from 'react'
import { capitalize } from '../helper'
import { useInView } from 'react-intersection-observer'

export default function MoveDetail({ move, backgroundColor }) {
    const { inView, ref } = useInView({
        threshold: 0.5
    })

    return (
        <div className={`${inView ? 'animate-flyInRight' : 'animate-flyOutLeft'} translate-x-32 opacity-0 w-72 p-2 grid grid-cols-2 items-center mx-auto rounded-lg sm:w-80 ${backgroundColor}`} ref={ref}>
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
    )
}

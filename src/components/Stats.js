import React,  { useEffect } from 'react'
import { capitalize } from '../helper'
import { TYPES_COLOR_MAP } from './TYPES_MAP'


export default function Stats({ stats, active, type }) {
    useEffect(() => {
        const statDivs = document.querySelectorAll('[data-stat]')
        const timeOut = setTimeout(() => {
           statDivs.forEach(div => {
                div.querySelector('.bar').style.setProperty('--percentage', div.dataset.stat)
            }) 
        }, 2000)
        return () => clearTimeout(timeOut)
    }, [])

    const typeColor = TYPES_COLOR_MAP[type]
    const afterBgColor = typeColor.afterColor
    
    return (
            <div className={`${active === 'stats' ? 'animate-flyIn': 'hidden' } w-72 pt-3 py-3 space-y-3 bg-gray-900 mt-7 mx-auto rounded-xl flex flex-col text-gray-100 translate-y-12 opacity-0 sm:w-80`}>
                {stats.map((stat, index) => (
                    <div className="grid grid-cols-7 w-full gap-3 items-center" data-stat={stat.value} key={index}>
                        <h4 className="col-span-2 text-left">{capitalize(stat.name)}</h4>
                        <p className="text-left font-semibold">{stat.value}</p>
                        <div className={` col-span-4 h-3 bg-gray-500 rounded-lg bar relative overflow-hidden after:absolute after:content-[''] after:top-0 after:left-0 after:h-full after:scale-x-0 after:animate-scaling after:origin-left ${stat.name === 'Sp. Atk' || stat.name === 'Sp. Def' ? afterBgColor : 'after:bg-gray-100'} after:rounded-lg`} />
                    </div>
                ))}
            </div>
    )
}
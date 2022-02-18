import React, { useEffect, useState, useRef } from 'react'
import { ACTIONS, usePokemons } from '../hooks/usePokemon'

export default function AbilitySelect() {
    const [open, setOpen] = useState(false)
    const [abilities, setAbilities] = useState([])
    const { state, dispatch } = usePokemons()
    const selectedAbility = state.selectedAbility
    const bounceTimer = useRef()
    const abilitySearchTerm = useRef('')
    const optionsRef = useRef()

    async function fetchAbilities() {
        const response = await fetch('https://pokeapi.co/api/v2/ability/?offset=0&limit=327')
        const data = await response.json()
        const receivedAbilities = ['All', ...data.results.map(ability => ability.name)]
        setAbilities(receivedAbilities)
    }

    useEffect(() => {
        fetchAbilities()
    }, [])

    useEffect(() => {
        if (!optionsRef.current) return
        const optionElements = [...optionsRef.current.querySelectorAll('p')]
        const selectedOptionElement = optionElements.find(element => element.innerText.toLowerCase() === selectedAbility.toLowerCase())
        selectedOptionElement?.scrollIntoView({ block: 'nearest' })
    }, [selectedAbility])

    function handleOptionClick(ability) {
        dispatch({
            type: ACTIONS.UPDATE_SELECTED_ABILITY,
            payload: {
                selectedAbility: ability
            }
        })
        setOpen(false)
    }

    function handleKeyDown(e) {
        e.preventDefault()
        
        switch (e.code) {
            case 'ArrowUp': {
                const currentIndex = abilities.indexOf(selectedAbility)
                if (currentIndex <= 0) return
                const previousAbility = abilities[currentIndex - 1]
                dispatch({
                    type: ACTIONS.UPDATE_SELECTED_ABILITY,
                    payload: {
                        selectedAbility: previousAbility
                    }
                })
                break
            }

            case 'ArrowDown': {
                const currentIndex = abilities.indexOf(selectedAbility)
                if (currentIndex >= abilities.length - 1) return
                const nextAbility = abilities[currentIndex + 1]
                dispatch({
                    type: ACTIONS.UPDATE_SELECTED_ABILITY,
                    payload: {
                        selectedAbility: nextAbility
                    }
                })
                break
            }

            case 'Space': 
                setOpen(prevOpen => !prevOpen)
                break

            case 'Enter':
            case 'Escape':
                setOpen(false)
                break

            default: 
                clearTimeout(bounceTimer.current)

                abilitySearchTerm.current += e.key
                bounceTimer.current = setTimeout(() => {
                    abilitySearchTerm.current = ''
                }, 500)
                
                const searchedAbility = abilities.find(ability => ability.toLowerCase().includes(abilitySearchTerm.current.toLowerCase()))
                if (searchedAbility) {
                    dispatch({
                        type: ACTIONS.UPDATE_SELECTED_ABILITY,
                        payload: {
                            selectedAbility: searchedAbility
                        }
                    })
                }
        }
    }

    return (
    <div className="mt-3 relative" tabIndex={0} onKeyDown={handleKeyDown}>
        <h3 
            className="group w-full py-2 px-3 bg-gray-100 rounded-md cursor-pointer flex justify-between items-center"
            onClick={() => setOpen(prevOpen => !prevOpen)}
        >
            {selectedAbility}
            <span className="arrow border-blue-300 rotate-45 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:rotate-45 transform transition"></span>
        </h3>
        <div className={`${open ? 'block' : 'hidden'} w-full h-52 overflow-y-scroll py-2 mt-1 absolute top-7 bg-gray-300 rounded-sm`} ref={optionsRef}>
            {abilities.map(ability => (
                <p 
                    key={ability}
                    className={`w-full py-1 px-3 hover:bg-blue-300 hover:text-gray-100 cursor-pointer ${ability === selectedAbility ? 'bg-blue-500 text-gray-100' : ''}`}
                    onClick={() => handleOptionClick(ability)}
                >{ability}</p>
            ))}
        </div>
    </div>
  )
}

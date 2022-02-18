import { getPokemons } from "./hooks/usePokemon"

export async function formatPokemon(pokemonURL) {
    const rawData = await fetch(pokemonURL)
    const pokemon = await rawData.json()
    return {
        id: pokemon.id,
        name: pokemon.name,
        url: pokemonURL,
        imageURL: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types.map(type => type.type.name),
        abilities: pokemon.abilities.map(ability => ability.ability.name)
    }
}


async function getMoves(pokemon) {
    const movesPromises = pokemon.moves.map(move => {
        return fetch(move.move.url)
    })
    const rawMoves = await Promise.all(movesPromises)
    const movesRes = rawMoves.map(move => {
        return move.json()
    })
    const movesData = await Promise.all(movesRes)
    return movesData.map(move => {
        return {
            name: move.name,
            accuracy: move.accuracy,
            power: move.power,
            type: move.type.name
        }
    })
}

async function getLocations(pokemonURL) {
    const rawLocations = await fetch(`${pokemonURL}/encounters`)
    const locations = await rawLocations.json()
    return locations.map(location => {
        return {
            name: location.location_area.name,
            url: location.location_area.url
        }
    })
}

export async function formatPokemonDetail(pokemonURL) {
    const rawData = await fetch(pokemonURL)
    const pokemon = await rawData.json()
    const moves = await getMoves(pokemon)
    const locations = await getLocations(pokemonURL)
    return {
        id: pokemon.id,
        name: pokemon.name,
        url: pokemonURL,
        imageURL: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types.map(type => type.type.name),
        weight: pokemon.weight,
        height: pokemon.height,
        stats: pokemon.stats.map(stat => {
            let statName = stat.stat.name
            if (stat.stat.name === 'special-attack') statName = 'Sp. Atk'
            if (stat.stat.name === 'special-defense') statName = 'Sp. Def'
            return {
                name: statName,
                value: stat.base_stat
            }
        }),
        moves,
        locations
    }
}

export function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1)
}

export function IDConverter(id) {
    if (id < 10) {
        return '#00' + id
    }

    if (id >=10 && id < 100) {
        return '#0' + id
    }
    
    return '#' + id
} 
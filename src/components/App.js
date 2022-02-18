import Home from "./Home";
import PokemonDetail from './PokemonDetail'
import PokemonProvider from '../hooks/usePokemon'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div id="pokemon-app">
			<Router>
				<PokemonProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/pokemon/:pokemonId" element={<PokemonDetail />} />
					</Routes>
				</PokemonProvider>
			</Router>
		</div>
	);
}

export default App;

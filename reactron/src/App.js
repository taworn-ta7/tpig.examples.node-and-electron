import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AppContext from './AppContext'

const App = () => {
	return (
		<BrowserRouter>
			<AppContext.Provider value={{}}>
				<Switch>
					<Route exact path="/" component={HomePage} />
				</Switch>
			</AppContext.Provider>
		</BrowserRouter>
	)
}

export default App

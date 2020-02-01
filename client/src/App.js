import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import mainLogo from "./premier_league.png";

//importing components
import TeamTable from "./components/TeamTable/TeamTable";
import TeamModal from "./components/TeamModal/TeamModal";
import PlayerModal from "./components/PlayerModal/PlayerModal";

//apollo client setup
const client = new ApolloClient({
	uri: "http://localhost:3001/graphql"
});

function App() {
	return (
		//wrapping 'main' div inside of the ApolloProvider
		<ApolloProvider client={client}>
			<div id="main">
				<img src={mainLogo} id="main-logo" alt="Premier-League-logo" />
				<h1>Premier League Teams</h1>
				<TeamTable />
				<TeamModal />
				<PlayerModal />
			</div>
		</ApolloProvider>
	);
}

export default App;

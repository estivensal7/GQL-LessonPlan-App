//importing dependencies
import { gql } from "apollo-boost";

// query to grab all team
const getTeamsQuery = gql`
	{
		teams {
			id
			name
			logo
			venue_name
		}
	}
`;

// query to grab all players
const getPlayersQuery = gql`
	{
		players {
			id
			player_name
			position
			age
			team {
				name
			}
		}
	}
`;

// query to grab a single team - we will need to specify that we are passing through...
// an 'id' variable of type 'ID'
const getTeamQuery = gql`
	query($id: ID!) {
		team(id: $id) {
			name
			logo
			venue_name
			players {
				id
				player_name
				position
				age
			}
		}
	}
`;

// query to grab a single player - we will need to specify that we are passing through...
// an 'id' variable of type 'ID'
const getPlayerQuery = gql`
	query($id: ID!) {
		player(id: $id) {
			id
			player_name
			position
			age
			team {
				id
				name
				venue_name
			}
		}
	}
`;

// mutation query to add new player - we will need to specify that we are passing through the parameters and their types
const addPlayerMutation = gql`
	mutation(
		$player_name: String!
		$position: String!
		$age: Int!
		$team_id: ID!
	) {
		addPlayer(
			player_name: $player_name
			position: $position
			age: $age
			team_id: $team_id
		) {
			player_name
			position
			age
			team_id
		}
	}
`;

// mutation query to add a new team - we will need to specify that we are passing through the parameters and their types
const addTeamMutation = gql`
	mutation($name: String!, $logo: String!, $venue_name: String!) {
		addTeam(name: $name, logo: $logo, venue_name: $venue_name) {
			name
			logo
			venue_name
		}
	}
`;

export {
	getTeamsQuery,
	getPlayersQuery,
	getTeamQuery,
	getPlayerQuery,
	addPlayerMutation,
	addTeamMutation
};

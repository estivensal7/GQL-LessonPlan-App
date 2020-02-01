//importing dependencies
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getTeamQuery } from "../../Queries/queries.js";
import { Table } from "reactstrap";

class PlayerTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamInfo: {}
		};
	}

	displayPlayerDetails() {
		const team = this.props.data.team;

		// if/else statement used to render data if team is selected, else ... return 'no team selected'
		if (team) {
			const players = team.players;

			return players.map(player => {
				return (
					<tr key={player.id}>
						<td>{player.player_name}</td>
						<td>{player.position}</td>
						<td>{player.age}</td>
					</tr>
				);
			});
		} else {
			return (
				<tr>
					<td>Loading Players...</td>
				</tr>
			);
		}
	}

	displayHeaderDetails() {
		const team = this.props.data.team;

		if (team) {
			return <img src={this.props.data.team.logo} alt="team-logo" />;
		}
	}

	render() {
		return (
			<div id="player-details">
				<div id="header-details">{this.displayHeaderDetails()}</div>
				<Table dark bordered>
					<thead>
						<tr>
							<th>Name</th>
							<th>Position</th>
							<th>Age</th>
						</tr>
					</thead>
					<tbody>{this.displayPlayerDetails()}</tbody>
				</Table>
			</div>
		);
	}
}

// here we pass the 'book's ID' from the props as an argument into the options
// parameter of the getBookQuery in order to isolate the single book that was selected
export default graphql(getTeamQuery, {
	options: props => {
		return {
			variables: {
				id: props.teamId
			}
		};
	}
})(PlayerTable);

// importing dependencies
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getTeamsQuery } from "../../Queries/queries";
import { Table } from "reactstrap";

// importing components
import PlayerTable from "../PlayerTable/PlayerTable";

class TeamTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: "5e2d349f5ff0c21b4ab22c07"
		};
	}

	// function used to grab data, and display accordingly
	displayTeams() {
		let data = this.props.data;

		if (data.loading === true) {
			return (
				<tr>
					<td>Loading Teams...</td>
				</tr>
			);
		} else {
			return data.teams.map(team => {
				return (
					<tr key={team.id}>
						<th scope="row">
							<img
								src={team.logo}
								className="logo-image"
								alt={`${team.name}-logo`}
							/>
						</th>
						<td>{team.name}</td>
						<td>{team.venue_name}</td>
						<td
							onClick={e => {
								this.setState({
									selected: team.id
								});
							}}
							className="more-details">
							View Players
						</td>
					</tr>
				);
			});
		}
	}

	render() {
		return (
			<div>
				<Table dark bordered id="team-table">
					<thead>
						<tr>
							<th>Logo</th>
							<th>Name</th>
							<th>Venue Name</th>
							<th>More Details</th>
						</tr>
					</thead>
					<tbody>{this.displayTeams()}</tbody>
				</Table>
				<PlayerTable teamId={this.state.selected} />
			</div>
		);
	}
}

export default graphql(getTeamsQuery)(TeamTable);

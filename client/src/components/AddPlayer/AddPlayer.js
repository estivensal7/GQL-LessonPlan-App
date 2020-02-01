//importing dependencies
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { addPlayerMutation, getTeamsQuery } from "../../Queries/queries";
import { flowRight as compose } from "lodash";

//importing reactstrap components
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";

class AddPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player_name: "",
			position: "",
			age: 0,
			team_id: ""
		};
	}

	// event handler function used when 'submit' button is pressed
	submitForm(e) {
		e.preventDefault();
		console.log(this.state);
		console.log(this.props);
		this.props.addPlayerMutation({
			variables: {
				player_name: this.state.player_name,
				position: this.state.position,
				age: this.state.age,
				team_id: this.state.team_id
			},
			refetchQueries: [
				{
					query: getTeamsQuery
				}
			]
		});
	}

	renderTeamNames() {
		const teams = this.props.getTeamsQuery.teams;

		return teams.map(team => {
			return (
				<option key={team.id} value={team.ids}>
					{team.name}
				</option>
			);
		});
	}

	selectChangeHandler(e) {
		console.log(e.target.value);
		const teams = this.props.getTeamsQuery.teams;
		console.log(teams);
		for (let i = 0; i < teams.length; i++) {
			console.log(teams[i]);

			if (teams[i].name === e.target.value) {
				this.setState({ team_id: teams[i].id });
			}
		}
	}

	render() {
		return (
			<Form onSubmit={this.submitForm.bind(this)}>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Label for="player_name_input">Name</Label>
							<Input
								type="text"
								name="name"
								id="player_name_input"
								placeholder="Steven Gerrard"
								onChange={e => {
									this.setState({
										player_name: e.target.value
									});
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label for="position_input">Position</Label>
							<Input
								type="text"
								name="position"
								id="position_input"
								placeholder="Midfielder"
								onChange={e => {
									this.setState({
										position: e.target.value
									});
								}}
							/>
						</FormGroup>
					</Col>
				</Row>
				<FormGroup>
					<Label for="age_input">Age</Label>
					<Input
						type="number"
						name="age"
						id="age_input"
						placeholder="10"
						onChange={e => {
							this.setState({
								age: parseInt(e.target.value)
							});
						}}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="team_input">Team</Label>
					<Input
						type="select"
						name="team"
						id="team_input"
						placeholder="Select a Team"
						onChange={this.selectChangeHandler.bind(this)}>
						{this.renderTeamNames()}
					</Input>
				</FormGroup>
				<Button type="submit" color="success">
					Submit
				</Button>
			</Form>
		);
	}
}

export default compose(
	graphql(addPlayerMutation, { name: "addPlayerMutation" }),
	graphql(getTeamsQuery, { name: "getTeamsQuery" })
)(AddPlayer);

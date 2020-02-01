//importing dependencies
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { addTeamMutation, getTeamsQuery } from "../../Queries/queries";
import { flowRight as compose } from "lodash";

//importing reactstrap components
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";

class AddTeam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			logo: "",
			venue_name: ""
		};
	}

	// event handler function used when 'submit' button is pressed
	submitForm(e) {
		e.preventDefault();
		console.log(this.state);
		console.log(this.props);
		this.props.addTeamMutation({
			variables: {
				name: this.state.name,
				logo: this.state.logo,
				venue_name: this.state.venue_name
			},
			refetchQueries: [
				{
					query: getTeamsQuery
				}
			]
		});
	}

	render() {
		return (
			<Form onSubmit={this.submitForm.bind(this)}>
				<Row form>
					<Col md={6}>
						<FormGroup>
							<Label for="team_name_input">Name</Label>
							<Input
								type="text"
								name="name"
								id="team_name_input"
								placeholder="Manchester United"
								onChange={e => {
									this.setState({
										name: e.target.value
									});
								}}
							/>
						</FormGroup>
					</Col>
					<Col md={6}>
						<FormGroup>
							<Label for="team_logo_url_input">Logo URL</Label>
							<Input
								type="url"
								name="team_logo_url"
								id="team_logo_url_input"
								placeholder="team.logo/url"
								onChange={e => {
									this.setState({
										logo: e.target.value
									});
								}}
							/>
						</FormGroup>
					</Col>
				</Row>
				<FormGroup>
					<Label for="venue_name_input">Venue Name</Label>
					<Input
						type="text"
						name="venue_name"
						id="venue_name_input"
						placeholder="Old Trafford"
						onChange={e => {
							this.setState({
								venue_name: e.target.value
							});
						}}
					/>
				</FormGroup>
				<Button type="submit" color="success">
					Submit
				</Button>
			</Form>
		);
	}
}

export default compose(graphql(addTeamMutation, { name: "addTeamMutation" }))(
	AddTeam
);

import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddTeam from "../AddTeam/AddTeam";

const TeamModal = props => {
	const { className } = props;

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="success" onClick={toggle} id="team-modal-btn">
				Add New Team
			</Button>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Add New Team</ModalHeader>
				<ModalBody>
					<AddTeam />
				</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default TeamModal;

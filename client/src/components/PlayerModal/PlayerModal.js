import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddPlayer from "../AddPlayer/AddPlayer";

const PlayerModal = props => {
	const { className } = props;

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<div>
			<Button color="success" onClick={toggle} id="player-modal-btn">
				Add New Player
			</Button>
			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Add New Player</ModalHeader>
				<ModalBody>
					<AddPlayer />
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

export default PlayerModal;

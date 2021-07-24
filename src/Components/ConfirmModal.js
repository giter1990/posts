import React, { Component} from "react";
import { hot } from "react-hot-loader";
import { Modal, Paper, Typography, TextField, Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import clsx from "clsx"; 

class ConfirmModal extends React.Component {
	constructor(props) {
		super(props);
		this.agree = this.agree.bind(this);
		this.failure = this.failure.bind(this);
	}
	
	agree() {
		const deleteMe = this.props.deleteMe,
			index = this.props.indexPost,
			id = this.props.idPost,
			closeConfimWindow = this.props.closeConfimWindow;
			
		deleteMe(index, id);
		closeConfimWindow();
	}
	
	failure() {
		const closeConfimWindow = this.props.closeConfimWindow;
		
		closeConfimWindow();
	}
	
	render() {
		const openConfirmModal = this.props.openConfirmModal,
			closeConfimWindow = this.props.closeConfimWindow,
			classes = this.props.classes;
			
		return (
			<Modal
				open={openConfirmModal}
				onClose={closeConfimWindow}
				aria-labelledby="modal-title-confirm-delete-post"
				aria-describedby="modal-description-confirm-delete-post"
			>
				<Paper className={classes.modal}>
					<Close className={classes.closeIcon} onClick={closeConfimWindow} />
					<Typography variant="h5" className={classes.header}>
						Confirmation deleting an existing post
					</Typography>
					<Typography>
						Are you sure really to delete this post?
					</Typography>
					<Button onClick={this.agree}
						className={classes.buttonModal}
						color="primary"
						variant="contained"
					>
						Yes, I do
					</Button>
					<Button onClick={this.failure}
						className={ clsx(classes.buttonModal, classes.buttonFailure) }
						color="primary"
						variant="contained"
					>
						No, I'm not
					</Button>
				</Paper>
			</Modal>
		)
	}
}

export default hot(module)(ConfirmModal);
import React, { Component} from "react";
import { hot } from "react-hot-loader";
import { Modal, Paper, Typography, TextField, Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Controller } from "react-hook-form";

class EditModal extends React.Component {
	render() {
		const openEditModal = this.props.openEditModal,
			closeEditModal = this.props.closeEditModal,
			classes = this.props.classes,
			handleSubmit = this.props.handleSubmit,
			control = this.props.control,
			transferTitle = this.props.transferTitle,
			transferBody = this.props.transferBody,
			refTitle = this.props.refTitle,
			refBody = this.props.refBody,
			handleChildMount = this.props.handleChildMount;
					
		return (
			<Modal
				open={openEditModal}
				onClose={closeEditModal}
				aria-labelledby="modal-title-edit-post"
				aria-describedby="modal-description-edit-post"
			>
				<Paper className={classes.modal}>
					<Close className={classes.closeIcon} onClick={closeEditModal} />
					<Typography variant="h5" className={classes.header}>
						Edit an existing post to save changes to the grid
					</Typography>
					<form onSubmit={handleSubmit(() => {handleChildMount(event)})} className={classes.form}>
						<Controller
							control={control}
							defaultValue={transferTitle}
							name="title"
							render={({ field: { onChange, value },
								fieldState: { error }
							}) => (
								<TextField
									error={!!error}
									helperText={error ? error.message : null}
									inputProps={refTitle}
									label="Your title"
									onChange={onChange}
									type="text"
									variant="outlined"
									value={value}
								/>
							)}
							rules={{
								maxLength : {
									message: <p>No more then 100 characters</p>,
									value: 100
								},
								minLength: {
									message: <p>At least 1 character</p>,
									value: 1
								},
								required: "Title required!"
							}}
						/>
						<Controller
							control={control}
							defaultValue={transferBody}
							name="body"
							render={({ field: { onChange, value },
								fieldState: { error }
							}) => (
								<TextField
									error={!!error}
									fullWidth
									helperText={error ? error.message : "Please the world!"}
									inputProps={refBody}
									label="Some story, piece of news, etc..."
									margin="normal"
									multiline
									onChange={onChange}
									rows={4}
									type="text"
									variant="outlined"
									value={value}
								/>
							)}
							rules={{
								maxLength : {
									message: <p>No more then 1000 characters</p>,
									value: 1000
								},
								minLength: {
									message: <p>At least 1 character</p>,
									value: 1
								},
								required: "Body post required!"
							}}
						/>
						<Button className={classes.buttonModal} type="submit" variant="contained" color="primary">Apply post edit</Button>
					</form>
				</Paper>
			</Modal>
		)
	}
}

export default hot(module)(EditModal);
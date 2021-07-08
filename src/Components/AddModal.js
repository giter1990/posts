import React, { Component} from "react";
import { hot } from "react-hot-loader";
import { Modal, Paper, Typography, TextField, Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Controller } from "react-hook-form";

class AddModal extends React.Component {
	render() {
		const openAddModal = this.props.openAddModal,
			closeAddModal = this.props.closeAddModal,
			classes = this.props.classes,
			handleSubmit = this.props.handleSubmit,
			control = this.props.control,
			refTitle = this.props.refTitle,
			refBody = this.props.refBody,
			lengthInitArr = this.props.lengthInitArr,
			count = this.props.count,
			arrPostAdd = this.props.arrPostAdd,
			incrKey = this.props.incrKey,
			editPost = this.props.editPost,
			handleChildUnmount = this.props.handleChildUnmount;
			
		function addPost(e, title, body) {
			import("../js/add-post.js")
				.then(module => {
					module.default(e, closeAddModal, lengthInitArr, count, arrPostAdd, incrKey, title, body, editPost, handleChildUnmount, classes);
				});
		}
			
		return (
			<Modal
				open={openAddModal}
				onClose={closeAddModal}
				aria-labelledby="modal-title-add-post"
				aria-describedby="modal-description-add-post"
			>
				<Paper className={classes.modal}>
					<Close className={classes.closeIcon} onClick={closeAddModal} />
					<Typography variant="h5" className={classes.header}>
						Create a post to add it to the grid
					</Typography>
					<form onSubmit={handleSubmit(() => {addPost(event, fieldTitle, fieldBody)})} className={classes.form}>
						<Controller
							control={control}
							defaultValue=""
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
									value={value}
									variant="outlined"
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
							defaultValue=""
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
									value={value}
									variant="outlined"
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
						<Button className={classes.buttonModal} type="submit" variant="contained" color="primary">Add new post</Button>
					</form>
				</Paper>
			</Modal>
		)
	}
}

export default hot(module)(AddModal);
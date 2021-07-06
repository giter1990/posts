import React, { Component, useState } from "react";
import { hot } from "react-hot-loader";
import ReactDOM from "react-dom";
import loadable from "@loadable/component";
import { Grid, Fab, Modal, Paper, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Create, BorderColor, Close } from "@material-ui/icons";
import { useForm, Controller } from "react-hook-form";

const Post = loadable(() => import("./Components/Post.js")),
	useStyles = makeStyles((theme) => ({
		grid: {
			gridGap: "55px 20px",
			justifyContent: "space-evenly"
		},
		post: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			padding: 15
		},
		media: {
			height: 250,
			width: 250
		},
		content: {
			alignItems: "start",
			display: "grid",
			height: "-webkit-fill-available",
			justifyItems: "start",
			maxWidth: 250,
			"&:last-child": {
				padding: "15px 0 0"
			}
		},
		closeIcon: {
			cursor: "pointer",
			position: "absolute",
			right: 15,
			top: 15,
			"&:hover": {
				color: "blue"
			}
		},
		header: {
			color: theme.palette.success.main,
			fontWeight: "bold",
			textTransform: "uppercase"
		},
		body: {
			"&:first-letter": {
				textTransform: "capitalize"
			}
		},
		fab: {
			bottom: 30,
			left: "50%",
			position: "fixed",
			transform: "translateX(-50%)",
			"&:hover": {
				transition: ".5s"
			}
		},
		extendedIcon: {
			marginRight: theme.spacing(1),
		},
		modal: {
			left: "50%",
			padding: 30,
			position: "fixed",
			top: "50%",
			transform: "translate(-50%, -50%)"
		},
		form: {
			marginTop: 10
		},
		buttonModal: {
			margin: "15px auto 0",
			width: "fit-content"
		},
		buttonCard: {
			alignSelf: "end",
			gridArea: "3 / 1 / 4 / 2"
		},
		editButton: {
			background: theme.palette.success.main
		},
		delButton: {
			marginLeft: "auto"
		}
	}));

let changeCount = 0,
	incrKey = 0,
	arrIdDefaultDel = [],
	arrIdCustomDel = [],
	arrPostAdd = [],
	lengthInitArr,
	transferTitle,
	transferBody,
	openPostIndex,
	renderDefaultIndex,
	renderDefaultTitle,
	renderDefaultBody,
	renderCustomTitle,
	renderCustomBody;
	
function Main() {
	const classes = useStyles(),
		[count, setCount] = useState(0),
		[renderChild, setRenderChild] = useState(true),
		[openAddModal, setOpenAddModal] = useState(false),
		[openEditModal, setOpenEditModal] = useState(false),
		[order, setOrder] = useState(),
		refTitle = { id: "fieldTitle" },
		refBody = {	id: "fieldBody" },
		{ register, handleSubmit, control, watch, formState: { errors } } = useForm( {shouldUnregister: true} );
	
	function createPost() {
		setOpenAddModal(true);
	}
	
	function closeAddModal() {
		setOpenAddModal(false);
	}
	
	function editPost(index, header, body) {
		openPostIndex = index;
		
		transferTitle = header;
		transferBody = body;
		
		setOpenEditModal(true);
	}
	
	function closeEditModal() {
		setOpenEditModal(false);
	}
	
	function addPost(e, title, body) {
		e.preventDefault();
		closeAddModal();
		
		lengthInitArr = count.length;
		lengthInitArr = lengthInitArr + arrPostAdd.length;
		
		arrPostAdd.push(
			<Post
				id={"post-" + (lengthInitArr + 1)}
				index={lengthInitArr}
				key={lengthInitArr + incrKey}
				incrKey={incrKey}
				title={title.value}
				bodyPost={body.value}
				mountMe={editPost}
				unmountMe={handleChildUnmount}
				post={classes.post}
				media={classes.media}
				content={classes.content}
				header={classes.header}
				body={classes.body}
				buttonCard={classes.buttonCard}
				editButton={classes.editButton}
				delButton={classes.delButton}
				randomImgSrc={"https://picsum.photos/250/175.webp"}
			/>
		)
		
		fetch("https://jsonplaceholder.typicode.com/posts", {
			method: "POST",
			body: JSON.stringify({
				title: title.value,
				body: body.value,
				userId: 1
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			}
		})
			.then((response) => response.json());
			
		return arrPostAdd;
	}
	
	function handleChildMount(e) {
		e.preventDefault();
		
		let fieldTitle = document.getElementById("fieldTitle"),
			fieldBody = document.getElementById("fieldBody");
		
		if (changeCount === 0) {
			setRenderChild(false);
		}
		changeCount++;
		
		closeEditModal();
		
		for (let i = 0; i < count.length; i++) {
			if (count.indexOf(count[i]) === openPostIndex) {
				count[i].title = fieldTitle.value;
				count[i].body = fieldBody.value;
				
				renderDefaultIndex = i;
				renderDefaultTitle = count[i].title;
				renderDefaultBody = count[i].body;
				
				fetch("https://jsonplaceholder.typicode.com/posts/" + (openPostIndex + 1), {
					method: "PUT",
					body: JSON.stringify({
						title: count[i].title,
						body: count[i].body
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				})
					.then((response) => response.json());
			}
		}
		
		for (let i = 0; i < arrPostAdd.length; i++) {
			if (arrPostAdd[i].props.index === openPostIndex) {
				renderCustomTitle = fieldTitle.value;
				renderCustomBody = fieldBody.value;
				
				fetch("https://jsonplaceholder.typicode.com/posts/" + (openPostIndex + 1), {
					method: "PUT",
					body: JSON.stringify({
						title: fieldTitle.value,
						body: fieldBody.value
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				})
					.then((response) => response.json());
			}
		}  
	}
			
	function handleChildUnmount(number, identifier) {
		if (changeCount === 0) {
			setRenderChild(false);
		}
		changeCount++;
		
		setOrder(number);
						
		if (number <= 99) {
			arrIdDefaultDel.push(identifier);
		} else {
			arrIdCustomDel.push(identifier);
		}
				
		fetch("https://jsonplaceholder.typicode.com/posts/" + number, {method: "DELETE"})
			.then((response) => response.json());
	}
	
	fetch("https://jsonplaceholder.typicode.com/posts/")
		.then((response) => response.json())
		.then((json) => {
			setCount(json);
		});
		
	function generatePosts() {
		document.documentElement.style.overflowY = "overlay";
		document.documentElement.style.marginLeft = "-25px";
		
		let arr = [];
		
		for (let i = 0; i < count.length; i++) {
			if (renderChild) {
				arr.push(
					<Post 
						id={"post-" + (i + 1)}
						index={i}
						key={i}
						title={count[i].title}
						bodyPost={count[i].body}
						mountMe={editPost}
						unmountMe={handleChildUnmount}
						post={classes.post}
						media={classes.media}
						content={classes.content}
						header={classes.header}
						body={classes.body}
						buttonCard={classes.buttonCard}
						editButton={classes.editButton}
						delButton={classes.delButton}
						randomImgSrc={"https://picsum.photos/250/175.webp"}
					/>
				);
			} else if (!renderChild) {
				if (!arrIdDefaultDel.includes("post-" + (i + 1))) {
					if ((renderDefaultTitle) && (renderDefaultBody) && (i === renderDefaultIndex)) {
						arr.push(
							<Post
								id={"post-" + (i + 1)}
								index={i}
								key={i}
								title={renderDefaultTitle}
								bodyPost={renderDefaultBody}
								mountMe={editPost}
								unmountMe={handleChildUnmount}
								post={classes.post}
								media={classes.media}
								content={classes.content}
								header={classes.header}
								body={classes.body}
								buttonCard={classes.buttonCard}
								editButton={classes.editButton}
								delButton={classes.delButton}
								randomImgSrc={"https://picsum.photos/250/175.webp"}
							/>
						);
					} else {
						arr.push(
							<Post
								id={"post-" + (i + 1)}
								index={i}
								key={i}
								title={count[i].title}
								bodyPost={count[i].body}
								mountMe={editPost}
								unmountMe={handleChildUnmount}
								post={classes.post}
								media={classes.media}
								content={classes.content}
								header={classes.header}
								body={classes.body}
								buttonCard={classes.buttonCard}
								editButton={classes.editButton}
								delButton={classes.delButton}
								randomImgSrc={"https://picsum.photos/250/175.webp"}
							/>
						);
					}
				}
			}
		}
		
		for (let i = 0; i < arrPostAdd.length; i++) {
			if (arrPostAdd[i].props.index === openPostIndex) {
				let lengthInitArr = count.length,
					elemPosition = arrPostAdd.indexOf(arrPostAdd[i]),
					elemKey = lengthInitArr + elemPosition;
				
				arr.push(
					<Post
						id={"post-" + (elemKey + 1)}
						index={elemKey}
						key={elemKey + incrKey}
						incrKey={incrKey}
						title={renderCustomTitle}
						bodyPost={renderCustomBody}
						mountMe={editPost}
						unmountMe={handleChildUnmount}
						post={classes.post}
						media={classes.media}
						content={classes.content}
						header={classes.header}
						body={classes.body}
						buttonCard={classes.buttonCard}
						editButton={classes.editButton}
						delButton={classes.delButton}
						randomImgSrc={"https://picsum.photos/250/175.webp"}
					/>
				);
				arrPostAdd.splice(arrPostAdd[i].props.index, 1);
			} else {
				arr.push(arrPostAdd[i]);
			}
		}
		
		for (let i = 0; i < arrPostAdd.length; i++) {
			if (arrPostAdd[i].props.id === arrIdCustomDel[0]) {
				let diff = arr.length - arr.indexOf(arrPostAdd[i]),
					positionArr = arr.indexOf(arrPostAdd[i]),
					positionArrPostAdd = arrPostAdd.indexOf(arrPostAdd[i]);
				
				if (diff !== 1) {
					incrKey++;
				}
				
				arr.splice(positionArr, 1);
				arrIdCustomDel.splice(0, 1);
				arrPostAdd.splice(positionArrPostAdd, 1);
			}
		}
		
		return arr;
	};
	
	let fieldTitle = document.getElementById("fieldTitle"),
		fieldBody = document.getElementById("fieldBody");
	
	return (
		<Grid container>
			<Grid item container className={classes.grid} xs={12}>
				{generatePosts()}
			</Grid>
			<Fab variant="extended" className={classes.fab} color="primary" aria-label="add" aria-label="edit" onClick={createPost}>
				<Create className={classes.extendedIcon} />Create post
			</Fab>
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
		</Grid>
	)
}

ReactDOM.render(<Main />, document.getElementById("js-container"));
export default hot(module)(Main);
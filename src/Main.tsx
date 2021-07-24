import React, { FC, Component, useState } from "react";
import { hot } from "react-hot-loader";
import ReactDOM from "react-dom";
import loadable from "@loadable/component";
import { Grid, Fab, Modal, Paper, Typography, TextField, Button } from "@material-ui/core";
import { Create, BorderColor, Close } from "@material-ui/icons";
import { useForm, Controller } from "react-hook-form";
import useStyles from "./js/make-styles.js";
import generatePosts from "./js/generate-posts.js";
import "@fontsource/roboto/700.css";

const Post = loadable(() => import("./Components/Post.js")),
	AddModal = loadable(() => import("./Components/AddModal.js")),
	EditModal = loadable(() => import("./Components/EditModal.js")),
	ConfirmModal = loadable(() => import("./Components/ConfirmModal.js"));
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
	renderCustomBody,
	indexPost,
	idPost;
	
interface Count {
	length: number;
	indexOf: number;
	title: string;
	body: string;
}
	
function Main() {
	const classes = useStyles(),
		[count, setCount] = useState<Count[]>([]),
		[renderChild, setRenderChild] = useState(true),
		[openAddModal, setOpenAddModal] = useState(false),
		[openEditModal, setOpenEditModal] = useState(false),
		[openConfirmModal, setOpenConfirmModal] = useState(false),
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
	
	function openConfimWindow() {
		setOpenConfirmModal(true);
	}
	
	function closeConfimWindow() {
		setOpenConfirmModal(false);
	}
	
	function addPost(e, title, body) {
		import("./js/add-post.js")
			.then(module => {
				module.default(e, closeAddModal, lengthInitArr, count, arrPostAdd, incrKey, title, body, editPost, handleChildUnmount, classes);
			});
	}
	
	function handleChildMount(e) {
		e.preventDefault();
		
		let fieldTitle = document.getElementById("fieldTitle") as any,
			fieldBody = document.getElementById("fieldBody") as any;
		
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
		indexPost = number;
		idPost = identifier;
		
		openConfimWindow();
	}
	
	function confirmDeleting(number, identifier) {
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
		
	generatePosts(count, renderChild, arrPostAdd, editPost, handleChildUnmount, classes, openPostIndex, renderCustomTitle, renderCustomBody, arrIdDefaultDel, renderDefaultTitle, renderDefaultBody, renderDefaultIndex, arrIdCustomDel, incrKey);
			
	let fieldTitle = document.getElementById("fieldTitle"),
		fieldBody = document.getElementById("fieldBody");
		
	return (
		<Grid container>
			<Grid item container className={classes.grid} xs={12}>
				{generatePosts(count, renderChild, arrPostAdd, editPost, handleChildUnmount, classes, openPostIndex, renderCustomTitle, renderCustomBody, arrIdDefaultDel, renderDefaultTitle, renderDefaultBody, renderDefaultIndex, arrIdCustomDel, incrKey)}
			</Grid>
			<Fab variant="extended" className={classes.fab} color="primary" aria-label="add" onClick={createPost}>
				<Create className={classes.extendedIcon} />Create post
			</Fab>
			<AddModal
				openAddModal={openAddModal}
				closeAddModal={closeAddModal}
				classes={classes}
				handleSubmit={handleSubmit}
				control={control}
				refTitle={refTitle}
				refBody={refBody}
				lengthInitArr={lengthInitArr}
				count={count}
				arrPostAdd={arrPostAdd}
				incrKey={incrKey}
				editPost={editPost}
				handleChildUnmount={handleChildUnmount}
			/>
			<EditModal
				openEditModal={openEditModal}
				closeEditModal={closeEditModal}
				classes={classes}
				handleSubmit={handleSubmit}
				control={control}
				transferTitle={transferTitle}
				transferBody={transferBody}
				refTitle={refTitle}
				refBody={refBody}
				handleChildMount={handleChildMount}
			/>
			<ConfirmModal 
				openConfirmModal={openConfirmModal}
				closeConfimWindow={closeConfimWindow}
				deleteMe={confirmDeleting}
				indexPost={indexPost}
				idPost={idPost}
				classes={classes}
			/>
		</Grid>
	)
}

ReactDOM.render(<Main />, document.getElementById("js-container"));
export default hot(module)(Main);
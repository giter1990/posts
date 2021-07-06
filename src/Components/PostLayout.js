import React, { Component} from "react";
import { hot } from "react-hot-loader";
import ReactDOM from "react-dom";
import loadable from "@loadable/component";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import { BorderColor, Delete } from "@material-ui/icons";
import clsx from "clsx"; 
const Post = loadable(() => import("./Post.js"));

class PostLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {randomImgSrc: null};
		this.correct = this.correct.bind(this);
		this.dismiss = this.dismiss.bind(this);
	}
	
	componentDidMount() {
		fetch("https://picsum.photos/250/175.webp")
			.then((response) => this.setState({randomImgSrc: response.url}));
	}
	
	correct() {
		const index = this.props.index,
			title = this.props.title,
			bodyPost = this.props.bodyPost;
			
		console.log(title);
		
		this.props.mountMe(index, title, bodyPost);
	}
	
	dismiss() {
		const index = this.props.index,
			id = this.props.id;
			
		this.props.unmountMe(index, id);
	}
	
	render() {
		const id = this.props.id,
			incrKey = this.props.incrKey,
			title = this.props.title,
			bodyPost = this.props.bodyPost,
			post = this.props.post,
			media = this.props.media,
			content = this.props.content,
			header = this.props.header,
			body = this.props.body,
			buttonCard = this.props.buttonCard,
			editButton = this.props.editButton,
			delButton = this.props.delButton;
		
		return (
			<Grid id={id} item>
				<Card className={post}>
					<CardMedia className={media}
						component="img"
						src={this.state.randomImgSrc}
						alt="Random image"
					/>
					<CardContent className={content}>
						<Typography variant="subtitle1" className={header}>
							{title}
						</Typography>
						<Typography className={body}>
							{bodyPost}
						</Typography>
						<Button onClick={this.correct}
							color="primary"
							variant="contained"
							className={ clsx(buttonCard, editButton) }
							startIcon={<BorderColor />}
						>
							Edit
						</Button>
						<Button onClick={this.dismiss}
							variant="contained"
							color="primary"
							className={ clsx(buttonCard, delButton) }
							startIcon={<Delete />}
						>
							Delete
						</Button>
					</CardContent>
				</Card>
			</Grid>
		)
	}
}

export default hot(module)(PostLayout);
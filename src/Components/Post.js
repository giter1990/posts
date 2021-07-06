import React, { Component} from "react";
import { hot } from "react-hot-loader";
import loadable from "@loadable/component";
const PostLayout = loadable(() => import("./PostLayout.js"));

class Post extends React.Component {
	render() {
		const id = this.props.id,
			index = this.props.index,
			incrKey = this.props.incrKey,
			title = this.props.title,
			bodyPost = this.props.bodyPost,
			mountMe = this.props.mountMe,
			unmountMe = this.props.unmountMe,
			post = this.props.post,
			media = this.props.media,
			content = this.props.content,
			header = this.props.header,
			body = this.props.body,
			buttonCard = this.props.buttonCard,
			editButton = this.props.editButton,
			delButton = this.props.delButton;
			
		return <PostLayout
			id={id}
			index={index}
			incrKey={incrKey}
			title={title}
			bodyPost={bodyPost}
			mountMe={mountMe}
			unmountMe={unmountMe}
			post={post}
			media={media}
			content={content}
			header={header}
			body={body}
			buttonCard={buttonCard}
			editButton={editButton}
			delButton={delButton}
		/>;
	}
}

export default hot(module)(Post);
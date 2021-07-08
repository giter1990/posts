import React, { Component } from "react";
import loadable from "@loadable/component";
const Post = loadable(() => import("../Components/Post.js"));

export default (e, disappearAddWindow, yardDefaultArr, grid, addedPosts, raiseScale, header, main, changeNew, deleteNew, styles) => {
	e.preventDefault();
	disappearAddWindow();
	
	yardDefaultArr = grid.length;
	yardDefaultArr = yardDefaultArr + addedPosts.length;
	
	addedPosts.push(
		<Post
			id={"post-" + (yardDefaultArr + 1)}
			index={yardDefaultArr}
			key={yardDefaultArr + raiseScale}
			raiseScale={raiseScale}
			title={header.value}
			bodyPost={main.value}
			mountMe={changeNew}
			unmountMe={deleteNew}
			post={styles.post}
			media={styles.media}
			content={styles.content}
			header={styles.header}
			body={styles.body}
			buttonCard={styles.buttonCard}
			editButton={styles.editButton}
			delButton={styles.delButton}
		/>
	)
	
	fetch("https://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		body: JSON.stringify({
			title: header.value,
			body: main.value,
			userId: 1
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		}
	})
		.then((response) => response.json());
		
	return addedPosts;
}
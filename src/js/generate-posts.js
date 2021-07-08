import React, { Component } from "react";
import loadable from "@loadable/component";
const Post = loadable(() => import("../Components/Post.js"));

export default (grid, renderChild, addedPosts, changeNew, deleteNew, styles, extVisiblePost, paintUserHeader, paintUserMain, setDelIdDefault, paintDefaultHeader, paintDefaultMain, paintDefaultIdentif, setDelIdUser, raiseScale) => {
	document.documentElement.style.overflowY = "overlay";
	document.documentElement.style.marginLeft = "-25px";
	
	let arr = [];
	
	for (let i = 0; i < grid.length; i++) {
		if (renderChild) {
			arr.push(
				<Post 
					id={"post-" + (i + 1)}
					index={i}
					key={i}
					title={grid[i].title}
					bodyPost={grid[i].body}
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
			);
		} else if (!renderChild) {
			if (!setDelIdDefault.includes("post-" + (i + 1))) {
				if ((paintDefaultHeader) && (paintDefaultMain) && (i === paintDefaultIdentif)) {
					arr.push(
						<Post
							id={"post-" + (i + 1)}
							index={i}
							key={i}
							title={paintDefaultHeader}
							bodyPost={paintDefaultMain}
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
					);
				} else {
					arr.push(
						<Post
							id={"post-" + (i + 1)}
							index={i}
							key={i}
							title={grid[i].title}
							bodyPost={grid[i].body}
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
					);
				}
			}
		}
	}
	
	for (let i = 0; i < addedPosts.length; i++) {
		if (addedPosts[i].props.index === extVisiblePost) {
			let lengthInitArr = grid.length,
				elemPosition = addedPosts.indexOf(addedPosts[i]),
				elemKey = lengthInitArr + elemPosition;
			
			arr.push(
				<Post
					id={"post-" + (elemKey + 1)}
					index={elemKey}
					key={elemKey + raiseScale}
					raiseScale={raiseScale}
					title={paintUserHeader}
					bodyPost={paintUserMain}
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
			);
			addedPosts.splice(addedPosts[i].props.index, 1);
		} else {
			arr.push(addedPosts[i]);
		}
	}
	
	for (let i = 0; i < addedPosts.length; i++) {
		if (addedPosts[i].props.id === setDelIdUser[0]) {
			let diff = arr.length - arr.indexOf(addedPosts[i]),
				positionArr = arr.indexOf(addedPosts[i]),
				positionaddedPosts = addedPosts.indexOf(addedPosts[i]);
			
			if (diff !== 1) {
				raiseScale++;
			}
			
			arr.splice(positionArr, 1);
			setDelIdUser.splice(0, 1);
			addedPosts.splice(positionaddedPosts, 1);
		}
	}
	
	return arr;
};
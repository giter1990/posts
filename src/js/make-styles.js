import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

export default useStyles;
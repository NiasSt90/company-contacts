import React from "react";
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper,
		'& span': {
			margin: theme.spacing(0, 0.5),
		},
	},
	inline: {
		display: 'inline',
	},
}));

const ContactPersonView  = observer( (props) => {
	const classes = useStyles();
	const editMode = props.editMode;
	const person = props.person;
	const deletePerson = (event) => {
		props.onPersonDelete(props.person);
	}

	return editMode === true ?
			<Card>
				<CardContent>
					<TextField label="Topic" type="text" value={person.topic} onChange={e => person.topic = e.target.value}/>
					<TextField label="Name" type="text" value={person.name} onChange={e => person.name = e.target.value}/>
					<TextField label="Telefon" type="text" value={person.phone}
								  onChange={e => person.phone = e.target.value}/>
					<TextField label="Fax" type="text" value={person.fax} onChange={e => person.fax = e.target.value}/>
					<TextField label="E-Mail-Adresse" type="email" value={person.mail}
								  onChange={e => person.mail = e.target.value}/>
				</CardContent>
				<CardActions>
					<Button size="small" startIcon={<DeleteIcon/>} onClick={deletePerson}>Löschen</Button>
				</CardActions>
			</Card>
		:	<ListItem>
				<ListItemAvatar><Avatar>{person.name.charAt(0)}</Avatar></ListItemAvatar>
				<ListItemText primary={person.topic + ' ' + person.name}
						secondary={
							<Grid container alignItems="center" className={classes.root}>
								{person.phone && <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">Tel. {person.phone}</Typography>}
								<Divider orientation="vertical" flexItem />
								{person.mail && <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">E-Mail {person.mail}</Typography>}
								<Divider orientation="vertical" flexItem />
								{person.fax && <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">Fax {person.fax}</Typography>}
							</Grid>
						}
				/>
			</ListItem>
});

export default ContactPersonView;

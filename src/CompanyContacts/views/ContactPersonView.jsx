import React from "react";
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

class ContactPersonView extends React.Component {

	deletePerson = (event) => {
		this.props.onPersonDelete(this.props.person);
	}

	render() {
		const person = this.props.person;
		const editMode = this.props.editMode;
		if (editMode === true) {
			return <Card>
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
					<Button size="small" startIcon={<DeleteIcon/>} onClick={this.deletePerson}>Löschen</Button>
				</CardActions>
			</Card>
		}
		else {
			return <Card>
				<strong>{person.topic} {person.name}</strong><br/>
				<strong>{person.phone} / {person.mail} / {person.fax} </strong><br/>
			</Card>
		}
	}

}

export default observer(ContactPersonView);
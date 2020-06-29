import Dialog from "@material-ui/core/Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ContactPersonEditor = ({person, open, onSave, onCancel}) => {
	const [values, setValues] = React.useState({
		topic: person.topic,
		name: person.name,
		phone: person.phone,
		cellPhone: person.cellPhone,
		mail: person.mail,
		fax: person.fax
	})
	const handleInputChange = e => {
		const {name, value} = e.target
		setValues({...values, [name]: value})
	}
	return <Dialog open={open} onClose={onCancel}>
		<DialogTitle id="form-dialog-title">Kontaktdaten</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Kontaktdaten bearbeiten...
			</DialogContentText>
			<TextField label="Topic" type="text" value={values.topic} name="topic" onChange={handleInputChange}/>
			<TextField label="Name" type="text" value={values.name} name="name" onChange={handleInputChange}/>
			<TextField label="Telefon" type="text" value={values.phone} name="phone" onChange={handleInputChange}/>
			<TextField label="Mobil" type="text" value={values.cellPhone} name="cellPhone" onChange={handleInputChange}/>
			<TextField label="Fax" type="text" value={values.fax} name="fax" onChange={handleInputChange}/>
			<TextField label="E-Mail-Adresse" type="email" value={values.mail} name="mail" onChange={handleInputChange}/>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCancel} color="secondary" variant="contained">Abbrechen</Button>
			<Button onClick={() => onSave(values)} color="primary" variant="contained">Speichern</Button>
		</DialogActions>
	</Dialog>;
};

export default ContactPersonEditor;
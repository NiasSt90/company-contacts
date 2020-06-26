import Dialog from "@material-ui/core/Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ContactLinkEditor = ({link, open, setOpen, onSave}) => {
	const [values, setValues] = React.useState({
		name: link.name,
		url: link.url,
		description: link.description,
	})
	const handleInputChange = e => {
		const {name, value} = e.target
		setValues({...values, [name]: value})
	}
	const handleCancel = () => {
		setValues({...values, ...link})
		setOpen(false);
	};
	const handleSave = () => {
		onSave(values);
		setOpen(false);
	};
	return <Dialog open={open} onClose={handleCancel}>
		<DialogTitle id="form-dialog-title">Externer Link</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Link bearbeiten...
			</DialogContentText>
			<TextField label="Name" type="text" value={values.name} name="name" onChange={handleInputChange}/>
			<TextField label="URL" type="text" value={values.url} name="url" onChange={handleInputChange}/>
			<TextField label="Beschreibung" type="text" value={values.description} name="description" onChange={handleInputChange}/>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleCancel} color="secondary" variant="contained">Abbrechen</Button>
			<Button onClick={handleSave} color="primary" variant="contained">Speichern</Button>
		</DialogActions>
	</Dialog>;
};

export default ContactLinkEditor;
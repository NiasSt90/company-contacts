import Dialog from "@material-ui/core/Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const ContactLinkEditor = ({link, open, onSave, onCancel}) => {
	const [values, setValues] = React.useState({
		name: link.name,
		url: link.url,
		description: link.description,
	})
	const handleInputChange = e => {
		const {name, value} = e.target
		setValues({...values, [name]: value})
	}
	return <Dialog open={open} onClose={onCancel}>
		<DialogTitle id="form-dialog-title">Externer Link</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Link bearbeiten...
			</DialogContentText>
			<Grid container spacing={2} >
				<Grid item>
					<TextField label="Name" type="text" value={values.name} name="name" onChange={handleInputChange}/>
				</Grid>
				<Grid item>
					<TextField label="URL" type="text" value={values.url} name="url" onChange={handleInputChange}/>
				</Grid>
				<Grid item>
					<TextField label="Beschreibung" type="text" value={values.description} name="description" onChange={handleInputChange}/>
				</Grid>
			</Grid>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCancel} color="secondary" variant="contained">Abbrechen</Button>
			<Button onClick={() => onSave(values)} color="primary" variant="contained">Speichern</Button>
		</DialogActions>
	</Dialog>;
};

export default ContactLinkEditor;
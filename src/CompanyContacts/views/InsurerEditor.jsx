import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const InsurerEditor = ({insurer, open, setOpen, onSave}) => {
	const [values, setValues] = React.useState({
		name: insurer.name,
		street: insurer.address.street,
		number: insurer.address.number,
		zipCode: insurer.address.zipCode,
		city: insurer.address.city,
		hints: insurer.hints,
	})
	const handleInputChange = e => {
		const {name, value} = e.target
		setValues({...values, [name]: value})
	}
	const handleCancel = () => {
		setValues({
			...values,
			name: insurer.name,
			street: insurer.address.street,
			number: insurer.address.number,
			zipCode: insurer.address.zipCode,
			city: insurer.address.city,
			hints: insurer.hints,
		})//TODO: nice way to reset back to original values?
		setOpen(false);
	};
	const handleSave = () => {
		onSave(values);
		setOpen(false);
	};
	return <Dialog open={open} onClose={handleCancel}>
		<DialogTitle id="InsurerEditorDialog">Versicherer</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Versicherer bearbeiten...
			</DialogContentText>
			<FormGroup row>
				<TextField label="Name" type="text" value={values.name} name="name" onChange={handleInputChange}/>
				<TextField label="Straße" type="text" value={values.street} name="street" onChange={handleInputChange}/>
				<TextField label="Hausnummer" type="text" value={values.number} name="number" onChange={handleInputChange}/>
				<TextField label="PLZ" type="text" value={values.zipCode} name="zipCode" onChange={handleInputChange}/>
				<TextField label="Ort" type="text" value={values.city} name="city" onChange={handleInputChange}/>
				<FormControl>
					<TextareaAutosize id="hints" name="hints" value={values.hints} onChange={handleInputChange} rowsMin={10}
											placeholder="Hinweise und weitergehende Informationen zum Versicherer"/>
					<FormHelperText>Hinweise und weitergehende Informationen zum Versicherer</FormHelperText>
				</FormControl>
			</FormGroup>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleCancel} color="secondary" variant="contained">Abbrechen</Button>
			<Button onClick={handleSave} color="primary" variant="contained">Speichern</Button>
		</DialogActions>
	</Dialog>;
};

export default InsurerEditor;
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
import FormLabel from "@material-ui/core/FormLabel";
import InputBase from "@material-ui/core/InputBase";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	dialogContent: {
		//margin: theme.spacing(1),
	},
	formGroup: {
		margin: theme.spacing(2, 0),
	}
}));

const InsurerEditor = ({insurer, open, onSave, onCancel}) => {
	const classes = useStyles();
	const [values, setValues] = React.useState({
		name: insurer.name,
		street: insurer.address.street,
		number: insurer.address.number,
		zipCode: insurer.address.zipCode,
		city: insurer.address.city,
		hints: insurer.hints,
		imgDataURL: insurer.imgDataURL,
		imgURL: undefined,
	})
	const handleInputChange = e => {
		const {name, value} = e.target
		setValues({...values, [name]: value})
	}
	const handleSave = () => {
		onSave(values);
	};
	const handleCancel = () => {
		onCancel();
	};
	const handleFileUpload = event => {
		console.log(event.target.files[0]);
		const file = event.target.files[0];
		if (file.size > 30*1024) {
			alert("Die gewählte Datei ist zu groß um als Icon verwendet zu werden...maximal sind 30kb erlaubt.")
			return false;
		}
		let objectURL = URL.createObjectURL(event.target.files[0]);
		console.log(objectURL);
		(async function() {
			let blob = await fetch(objectURL).then(r => r.blob());
			let dataUrl = await new Promise(resolve => {
					let reader = new FileReader();
					reader.onload = () => resolve(reader.result);
					reader.readAsDataURL(blob);
				});
			setValues({...values, imgURL: objectURL, imgDataURL: dataUrl});
		})();
	}
	return <Dialog open={open} onClose={handleCancel}>
		<DialogTitle id="InsurerEditorDialog">Versicherer</DialogTitle>
		<DialogContent className={classes.dialogContent}>
			<DialogContentText>
				Versicherer bearbeiten...
			</DialogContentText>
			<FormGroup row className={classes.formGroup}>
				<FormControl>
					<FormLabel>Icon</FormLabel>
					{values.imgDataURL && <img alt="icon" src={values.imgDataURL ? values.imgDataURL : values.imgURL} width="128px" />}
					<InputBase onChange={handleFileUpload} type="file" accept="image/*"  placeholder="Versicherer Icon"/>
					<FormHelperText>Versicherer - Icon</FormHelperText>
				</FormControl>
				<TextField label="Name" type="text" value={values.name} name="name" onChange={handleInputChange}/>
			</FormGroup>
			<FormGroup row className={classes.formGroup}>
				<TextField label="Straße" type="text" value={values.street} name="street" onChange={handleInputChange}/>
				<TextField label="Hausnummer" type="text" value={values.number} name="number" onChange={handleInputChange}/>
				<br/>
				<TextField label="PLZ" type="text" value={values.zipCode} name="zipCode" onChange={handleInputChange}/>
				<TextField label="Ort" type="text" value={values.city} name="city" onChange={handleInputChange}/>
			</FormGroup>
			<FormGroup row className={classes.formGroup}>
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
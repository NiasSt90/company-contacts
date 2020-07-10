import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
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
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {useStores} from "../../hooks/useStores";
import {FileDocument} from "../model/FileDocument";
import {action} from "mobx";
import settings from "../../settings";

const vertriebe = ["DPC", "PKM", "FBD", "IMPACT", "ForumFinanz"]//ACHTUNG: keycloak "Gruppen"
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	dialogContent: {
		margin: theme.spacing(1),
	},
	formGroup: {
		margin: theme.spacing(2, 0),
	}
}));

const InsurerEditor = ({insurer, open, onSave, onCancel}) => {
	const classes = useStyles();
	const { documentModel } = useStores();
	const [values, setValues] = React.useState({
		name: insurer.name,
		street: insurer.address.street,
		number: insurer.address.number,
		zipCode: insurer.address.zipCode,
		city: insurer.address.city,
		hints: insurer.hints,
		imgDataURL: insurer.imgDataURL,
		imgBlobID: insurer.imgBlobID,
		visibility: insurer.visibility,
		visibilityPublic: insurer.visibility.length === 0,
	})
	const imageUrl = values.imgBlobID !== "" ? settings.REST_API_CONTACTS + "/blobs/" + values.imgBlobID : values.imgDataURL !== "" ? values.imgDataURL : undefined;

	const handleInputChange = e => {
		const {name, value} = e.target
		setValues({...values, [name]: value})
	}
	const handleCheckedChange = e => {
		const {name, checked} = e.target
		setValues({...values, [name]: checked})
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
		documentModel.uploadFile(new FileDocument(file, file.name, file.type))
				.then(action("UploadSuccess", document => setValues({...values, imgBlobID: document.id})))
	}
	return <Dialog open={open} onClose={handleCancel}>
		<DialogTitle id="InsurerEditorDialog">Versicherer bearbeiten</DialogTitle>
		<DialogContent className={classes.dialogContent}>
			<FormGroup row className={classes.formGroup}>
				<FormControl>
					<FormLabel>Icon</FormLabel>
					{imageUrl && <img alt="icon" src={imageUrl} width="128px" />}
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
					<TextareaAutosize id="hints" name="hints" value={values.hints} onChange={handleInputChange} rowsMin={6}
											placeholder="Hinweise und weitergehende Informationen zum Versicherer"/>
					<FormHelperText>Hinweise und weitergehende Informationen zum Versicherer</FormHelperText>
				</FormControl>
			</FormGroup>

			<FormControl component="fieldset">
				<FormLabel component="legend">Sichtbarkeiten für Vertriebe</FormLabel>
				<FormGroup>
					<FormControlLabel
							control={<Switch checked={values.visibilityPublic} onChange={handleCheckedChange} name="visibilityPublic" />}
							label="alle"
					/>
					{!values.visibilityPublic && <Select multiple value={values.visibility} name="visibility" onChange={handleInputChange}
								input={<Input id="select-multiple-chip"/>}
								renderValue={(selected) => (
										<div className={classes.chips}>
											{selected.map((value) => (
													<Chip key={value} label={value} className={classes.chip}/>
											))}
										</div>
								)}>
						 {vertriebe.map((name) => (<MenuItem key={name} value={name}>{name}</MenuItem>))}
					 </Select>}
				</FormGroup>
				<FormHelperText>Für welchen Vertrieb der Versicherer sichtbar ist.</FormHelperText>
			</FormControl>
		</DialogContent>
		<DialogActions>
			<Button onClick={handleCancel} color="secondary" variant="contained">Abbrechen</Button>
			<Button onClick={handleSave} color="primary" variant="contained">Speichern</Button>
		</DialogActions>
	</Dialog>;
};

export default InsurerEditor;
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import {useStores} from "../../hooks/useStores";
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {FileDocument} from "../model/FileDocument";


const DocumentUploader = observer(({open, onSave, onCancel}) => {
	const {documentModel} = useStores()
	const [ values, setValues ] = React.useState({file: undefined, name: ""});

	const handleUpload = () => {
		documentModel.uploadFile(new FileDocument(values.file, values.name, values.file.type)).then(doc => onSave(doc));
	}
	const handleFileSelect = (event) => {
		const file = event.target.files[0];
		const newValues = file ? {file: file, name: file.name, contentType: file.type} : {file: undefined, name: "", contentType: ""};
		setValues({...values, ...newValues})
	}
	const handleInputChange = e => {
		const {name, value} = e.target
		setValues({...values, [name]: value})
	}

	return <Dialog open={open} onClose={onCancel}>
		<DialogTitle id="upload-dialog">Dokument hochladen</DialogTitle>
		<DialogContent>
			<form>
				<FormControl fullWidth variant="outlined" margin="normal">
					<TextField name="name" label="Name" variant="outlined" InputLabelProps={{shrink: true}}
								  value={values.name} onChange={handleInputChange}/>
				</FormControl>
				<FormControl fullWidth variant="outlined" margin="normal">
					<OutlinedInput id="datei" required onChange={handleFileSelect} type="file" placeholder="Dokument"/>
				</FormControl>
			</form>
		</DialogContent>
		<DialogActions>
			<Button variant="contained" onClick={onCancel} color="secondary">Abbrechen</Button>
			<Button variant="contained" disabled={values.file === undefined} onClick={handleUpload} color="primary">Hochladen</Button>
		</DialogActions>
	</Dialog>
});

export default DocumentUploader;
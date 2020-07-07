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
import makeStyles from "@material-ui/core/styles/makeStyles";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles((theme) => ({
	root: {
	},
}));

const DocumentUploader = observer(({document, open, onSave, onCancel}) => {
	const classes = useStyles();
	const {documentModel} = useStores()
	const upload = () => {
		documentModel.uploadFile().then(doc => onSave(doc));
	}
	return <Dialog open={open} onClose={onCancel}>
		<DialogTitle id="upload-dialog">Dokument hochladen</DialogTitle>
		<DialogContent>
			<form className={classes.root}>
				<FormControl fullWidth variant="outlined" margin="normal">
					<TextField name="name" label="Name" variant="outlined" InputLabelProps={{shrink: true}}
								  value={documentModel.selectedDocument.name} onChange={documentModel.handleNameChange}
								  />
				</FormControl>
				<FormControl fullWidth variant="outlined" margin="normal">
					<OutlinedInput id="datei" required onChange={documentModel.handleFileSelect} type="file" placeholder="Dokument"/>
				</FormControl>
			</form>
		</DialogContent>
		<DialogActions>
			<Button variant="contained" onClick={onCancel} color="secondary">Abbrechen</Button>
			<Button variant="contained" disabled={document.file === undefined} onClick={upload} color="primary">Hochladen</Button>
		</DialogActions>
	</Dialog>
});

export default DocumentUploader;
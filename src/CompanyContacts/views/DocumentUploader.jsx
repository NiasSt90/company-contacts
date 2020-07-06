import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import FormGroup from "@material-ui/core/FormGroup";
import {useStores} from "../../hooks/useStores";
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const DocumentUploader = observer(({document, open, onSave, onCancel}) => {
	const classes = useStyles();
	const {documentModel} = useStores()
	documentModel.selectDocument(document);
	const upload = () => {
		documentModel.uploadFile().then(onSave(document));
	}
	return <Dialog open={open} onClose={onCancel}>
		<DialogTitle id="upload-dialog">Dokument hochladen</DialogTitle>
		<DialogContent>
			<form className={classes.root}>
				<FormGroup row>
					<FormControl>
						<TextField required label="Name" defaultValue="" value={documentModel.selectedDocument.name}
									  onChange={documentModel.handleNameChange}/>
					</FormControl>
				</FormGroup>
				<FormGroup row>
					<FormControl>
						<InputBase required onChange={documentModel.handleFileSelect} type="file" placeholder="Dokument"/>
					</FormControl>
				</FormGroup>
			</form>
		</DialogContent>
		<DialogActions>
			<Button variant="contained" onClick={onCancel} color="secondary">Abbrechen</Button>
			<Button variant="contained" disabled={document.file === undefined} onClick={upload} color="primary">Hochladen</Button>
		</DialogActions>
	</Dialog>
});

export default DocumentUploader;
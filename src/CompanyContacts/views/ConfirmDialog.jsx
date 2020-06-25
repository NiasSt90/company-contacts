import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ConfirmDialog = ({title, children, open, setOpen, onConfirm}) => {
	return <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
		<DialogTitle id="confirm-dialog">{title}</DialogTitle>
		<DialogContent>{children}</DialogContent>
		<DialogActions>
			<Button variant="contained" onClick={() => setOpen(false)} color="secondary">Nein</Button>
			<Button variant="contained" onClick={() => {setOpen(false);onConfirm();}} color="primary">Ja</Button>
		</DialogActions>
	</Dialog>
};
export default ConfirmDialog;
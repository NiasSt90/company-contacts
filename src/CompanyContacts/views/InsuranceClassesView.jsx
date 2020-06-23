import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import React from "react";
import ContactPersonView from "./ContactPersonView";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {observer} from "mobx-react";

function TabPanel(props) {
	const {children, value, index, ...other} = props;
	return (
			<div
					role="tabpanel"
					hidden={value !== index}
					id={`simple-tabpanel-${index}`}
					aria-labelledby={`simple-tab-${index}`}
					{...other}
			>
				{value === index && (
						<Box p={3}>
							<Typography>{children}</Typography>
						</Box>
				)}
			</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`
	};
}

const InsuranceClassesView = observer( (props) => {
	const [selectedTab, setSelectedTab] = React.useState(0);
	const [newClassName, setNewClassName] = React.useState("");
	const [openDialog, setOpenDialog] = React.useState(false);
	const changeSelectedTab = (event, value) => {
		setSelectedTab(value);
	}
	const handleAddPerson = (event) => {
		props.insurer.insuranceClasses[selectedTab].addPerson();
	}
	const handlePersonDelete = (person) => {
		props.insurer.insuranceClasses[selectedTab].removePerson(person);
	}
	const handleOpenDialog = () => {
		setOpenDialog(true);
	}
	const handleCloseDialog = (event, value) => {
		setOpenDialog(false);
	}
	const handleAddInsuranceClass = (event) => {
		props.insurer.addInsuranceClass(newClassName);
		handleCloseDialog();
	}

	return <>
		<Paper sqaure>
			<Tabs value={selectedTab} onChange={changeSelectedTab}>
				{props.insurer.insuranceClasses.map(
						(insuranceClass, i) => <Tab key={i} label={insuranceClass.className} {...a11yProps(i)} />)}
				{props.editMode && <IconButton onClick={handleOpenDialog} color="inherit">
					<AddIcon/>
				</IconButton>}
			</Tabs>
		</Paper>
		{props.insurer.insuranceClasses.map((insuranceClass, i) =>
				<TabPanel value={selectedTab} key={i} index={i}>
					{insuranceClass.contactPersons.map((person, i) =>
							<ContactPersonView key={i} person={person} editMode={props.editMode}
													 onPersonDelete={handlePersonDelete}/>)}
				</TabPanel>)}
		{props.editMode && <Button variant="contained" color="primary" startIcon={<AddIcon/>}
											onClick={handleAddPerson}>Kontakt anlegen</Button>
		}
		<Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Bereich hinzufügen</DialogTitle>
			<DialogContent>
				<DialogContentText>Name bzw. Kürzel des neuen Bereichs/Sparte</DialogContentText>
				<TextField autoFocus margin="dense" id="className" label="Bereich" type="text" fullWidth
							  value={newClassName} onChange={e => setNewClassName(e.target.value)}/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog} name='cancel' color="secondary">Abbrechen</Button>
				<Button onClick={handleAddInsuranceClass} name='add' color="primary">Hinzufügen</Button>
			</DialogActions>
		</Dialog>
	</>
});
export default InsuranceClassesView;
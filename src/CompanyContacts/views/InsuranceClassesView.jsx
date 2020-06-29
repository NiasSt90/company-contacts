import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
import List from "@material-ui/core/List";
import ContactLinkView from "./ContactLinkView";
import {useRoles} from "../../hooks/useRoles";
import Grid from "@material-ui/core/Grid";


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
							<Typography component="div">{children}</Typography>
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

const InsuranceClassesView = observer(({insurer}) => {
	const {isManager} = useRoles();
	const [selectedTab, setSelectedTab] = React.useState(0);
	const [newClassName, setNewClassName] = React.useState("");
	const [openDialog, setOpenDialog] = React.useState(false);
	const changeSelectedTab = (event, value) => {
		setSelectedTab(value);
	}
	const handleAddPerson = (event) => {
		insurer.insuranceClasses[selectedTab].addPerson();
	}
	const handleAddLink = (event) => {
		insurer.insuranceClasses[selectedTab].addLink();
	}
	const handlePersonDelete = (person) => {
		insurer.insuranceClasses[selectedTab].removePerson(person);
		if (insurer.insuranceClasses[selectedTab].isEmpty()) {
			insurer.delInsuranceClass(insurer.insuranceClasses[selectedTab])
		}
	}
	const handleLinkDelete = (link) => {
		insurer.insuranceClasses[selectedTab].removeLink(link);
		if (insurer.insuranceClasses[selectedTab].isEmpty()) {
			insurer.delInsuranceClass(insurer.insuranceClasses[selectedTab])
		}
	}
	const handleOpenDialog = () => {
		setOpenDialog(true);
	}
	const handleCloseDialog = (event, value) => {
		setOpenDialog(false);
		setNewClassName("");
	}
	const handleAddInsuranceClass = (event) => {
		insurer.addInsuranceClass(newClassName);
		handleCloseDialog();
	}

	return <>
		{isManager() && <Grid container justify="flex-end">
			<Button color="primary" startIcon={<AddIcon/>} onClick={handleOpenDialog}>Bereich anlegen</Button></Grid>}
		<Paper square>
			<Tabs value={selectedTab} onChange={changeSelectedTab} variant={"scrollable"} scrollButtons={"auto"}>
				{insurer.insuranceClasses.map(
						(insuranceClass, i) => <Tab key={i} label={insuranceClass.className} {...a11yProps(i)}/>)}
			</Tabs>
		</Paper>
		{insurer.insuranceClasses.map((insuranceClass, i) =>
				<TabPanel value={selectedTab} key={i} index={i}>
					<List>
						{insuranceClass.contactPersons.map((person, i) =>
								<ContactPersonView key={i} person={person} onPersonDelete={handlePersonDelete}/>)}
					</List>
					<List>
						{insuranceClass.links.map((link, i) =>
								<ContactLinkView key={i} link={link} onLinkDelete={handleLinkDelete}/>)}
					</List>
				</TabPanel>)
		}
		{isManager() && insurer.insuranceClasses.length > 0 &&
		 <>
			 <Button color="primary" startIcon={<AddIcon/>} onClick={handleAddPerson}>Kontakt
				 anlegen</Button>
			 <Button color="primary" startIcon={<AddIcon/>} onClick={handleAddLink}>Link
				 anlegen</Button>
		 </>
		}
		{insurer.insuranceClasses.length === 0 &&
		 <Box textAlign="center" fontStyle="oblique" fontWeight="fontWeightLight">Legen Sie zuerst einen Bereich
			 an...</Box>
		}
		<Dialog open={openDialog} onClose={handleCloseDialog}>
			<DialogTitle>Bereich hinzufügen</DialogTitle>
			<DialogContent>
				<DialogContentText>Name bzw. Kürzel des neuen Bereichs/Sparte</DialogContentText>
				<TextField autoFocus margin="dense" id="className" label="Bereich" type="text" fullWidth
							  value={newClassName} onChange={e => setNewClassName(e.target.value)}
							  onKeyUp={(event) => {if (event.key === 'Enter') {handleAddInsuranceClass();}}}/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog} name='cancel' color="secondary">Abbrechen</Button>
				<Button onClick={handleAddInsuranceClass} name='add' color="primary">Hinzufügen</Button>
			</DialogActions>
		</Dialog>
	</>
});
export default InsuranceClassesView;
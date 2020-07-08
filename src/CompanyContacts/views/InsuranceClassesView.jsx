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
import ContactPersonEditor from "./ContactPersonEditor";
import {ContactPerson} from "../model/ContactPerson";
import ContactLinkEditor from "./ContactLinkEditor";
import {ContactLink} from "../model/ContactLink";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {useStores} from "../../hooks/useStores";

function TabPanel(props) {
	const {children, value, index, ...other} = props;
	return (
			<div hidden={value !== index} {...other}>
				{value === index && (
						<Box p={1}>
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


const InsuranceClassesView = observer(({model, insurer}) => {
	const {isManager} = useRoles();
	// Section-TAB
	const [selectedTab, setSelectedTab] = React.useState(0);
	const changeSelectedTab = (event, value) => {
		setSelectedTab(value);
	}
	//PERSON-Editor
	const [selectedPerson, setSelectedPerson] = React.useState(undefined);
	const handleAddPerson = () => {
		setSelectedPerson(new ContactPerson())
	}
	const handleSelectPerson = (person) => {
		setSelectedPerson(person)
	}
	const handleSavePerson = (values) => {
		Object.keys(values).forEach(key => {
			selectedPerson[key] = values[key];
		})
		insurer.insuranceClasses[selectedTab].addPerson(selectedPerson);
		setSelectedPerson(undefined);
	}
	const handlePersonDelete = (person) => {
		insurer.insuranceClasses[selectedTab].removePerson(person);
		if (insurer.insuranceClasses[selectedTab].isEmpty()) {
			insurer.delInsuranceClass(insurer.insuranceClasses[selectedTab])
		}
	}
	//LINKS-Editor
	const [selectedLink, setSelectedLink] = React.useState(undefined);
	const handleAddLink = () => {
		setSelectedLink(new ContactLink())
	}
	const handleSelectLink = (link) => {
		setSelectedLink(link)
	}
	const handleSaveLink = (values) => {
		Object.keys(values).forEach(key => {
			selectedLink[key] = values[key];
		})
		insurer.insuranceClasses[selectedTab].addLink(selectedLink);
		setSelectedLink(undefined);
	}
	const handleLinkDelete = (link) => {
		insurer.insuranceClasses[selectedTab].removeLink(link);
		if (insurer.insuranceClasses[selectedTab].isEmpty()) {
			insurer.delInsuranceClass(insurer.insuranceClasses[selectedTab])
		}
	}

	//SECTION ADD
	const [newClassName, setNewClassName] = React.useState("");
	const [openDialog, setOpenDialog] = React.useState(false);
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

	return <Card style={{height:"100%"}} elevation={2}>
		<CardContent>
			<Paper square>
				<Tabs value={selectedTab} onChange={changeSelectedTab} variant={"scrollable"} scrollButtons={"auto"}>
					{insurer.insuranceClasses.map(
							(insuranceClass, i) => <Tab key={i} label={insuranceClass.className}/>)}
				</Tabs>
			</Paper>
			{insurer.insuranceClasses.map((insuranceClass, i) =>
					<TabPanel value={selectedTab} key={i} index={i}>
						<List>
							{insuranceClass.contactPersons.map((person, i) =>
									<ContactPersonView key={i} person={person} onEdit={handleSelectPerson}
															 onDelete={handlePersonDelete}/>)}
						</List>
						<List>
							{insuranceClass.links.map((link, i) =>
									<ContactLinkView key={i} link={link} onEdit={handleSelectLink}
														  onDelete={handleLinkDelete}/>)}
						</List>
					</TabPanel>)
			}
			{insurer.insuranceClasses.length === 0 &&
			 <Box textAlign="center" fontStyle="oblique" fontWeight="fontWeightLight">Legen Sie zuerst einen Bereich
				 an...</Box>
			}
		</CardContent>
		{isManager() && <>
			<CardActions>
				<Button color="primary" startIcon={<AddIcon/>} onClick={handleOpenDialog}>Bereich</Button>
				{selectedPerson !== undefined &&
				 <ContactPersonEditor open person={selectedPerson}
											 onSave={handleSavePerson} onCancel={() => handleSelectPerson(undefined)}/>
				}
				{selectedLink !== undefined &&
				 <ContactLinkEditor open link={selectedLink}
										  onSave={handleSaveLink} onCancel={() => handleSelectLink(undefined)}/>
				}
				{insurer.insuranceClasses.length > 0 &&
				 <>
					 <Button color="primary" startIcon={<AddIcon/>} onClick={handleAddPerson}>Kontakt</Button>
					 <Button color="primary" startIcon={<AddIcon/>} onClick={handleAddLink}>Link</Button>
				 </>
				}
			</CardActions>
			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>Bereich hinzufügen</DialogTitle>
				<DialogContent>
					<DialogContentText>Name bzw. Kürzel des neuen Bereichs/Sparte</DialogContentText>
					<TextField autoFocus margin="dense" id="className" label="Bereich" type="text" fullWidth
								  value={newClassName} onChange={e => setNewClassName(e.target.value)}
								  onKeyUp={(event) => {
									  if (event.key === 'Enter') {
										  handleAddInsuranceClass();
									  }
								  }}/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} name='cancel' color="secondary">Abbrechen</Button>
					<Button onClick={handleAddInsuranceClass} name='add' color="primary">Hinzufügen</Button>
				</DialogActions>
			</Dialog>
		</>
		}
	</Card>
});
export default InsuranceClassesView;
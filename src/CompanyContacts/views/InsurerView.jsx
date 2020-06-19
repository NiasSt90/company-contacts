/*@observer*/
import React from "react";
import {observer} from "mobx-react";
import AddressView from "./AddressView";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ContactPersonView from "./ContactPersonView";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

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
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

class InsurerView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0,
			openDialog: false,
			newClassName: undefined,
		}
	}

	changeSelectedTab = (event, value) => {
		this.setState({selectedTab: value});
	}
	handleOpenDialog = () => {
		this.setState({openDialog: true})
	}
	handleCloseDialog = (event, value) => {
		this.setState({openDialog: false, newClassName: undefined})
	}
	handleAddInsuranceClass = (event) => {
		this.props.insurer.addInsuranceClass(this.state.newClassName)
		this.handleCloseDialog();
	}
	handleAddPerson = (event) => {
		this.props.insurer.insuranceClasses[this.state.selectedTab].addPerson();
	}
	handlePersonDelete = (person) => {
		this.props.insurer.insuranceClasses[this.state.selectedTab].removePerson(person);
	}

	render() {
		const model = this.props.model
		const insurer = this.props.insurer
		const isInEditMode = model.editInsurer === insurer;
		const {selectedTab, openDialog} = this.state;

		const tabBar = (
				<AppBar position="static">
					<Tabs value={selectedTab} onChange={this.changeSelectedTab} aria-label="simple tabs example">
						{insurer.insuranceClasses.map(
								(insuranceClass, i) => <Tab key={i} label={insuranceClass.className} {...a11yProps(i)} />)}
						{isInEditMode && <IconButton aria-label="Sparte ergänzen" aria-haspopup="true"
															  onClick={this.handleOpenDialog} color="inherit">
							<AddIcon/>
						</IconButton>}
					</Tabs>
				</AppBar>
		);
		const tabContent = (<React.Fragment>
			{insurer.insuranceClasses.map((insuranceClass, i) =>
					<TabPanel value={selectedTab} key={i} index={i}>
						{insuranceClass.contactPersons.map((person, i) =>
								<ContactPersonView key={i} person={person} editMode={isInEditMode}
														 onPersonDelete={this.handlePersonDelete}/>)}
					</TabPanel>)}
			{isInEditMode && <Button variant="contained" color="primary" startIcon={<AddIcon/>}
											 onClick={this.handleAddPerson}>Kontakt anlegen</Button>
			}
		</React.Fragment>)

		const addinsuranceClassDialog = (
				<Dialog open={openDialog} onClose={this.handleCloseDialog} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Bereich hinzufügen</DialogTitle>
					<DialogContent>
						<DialogContentText>Name bzw. Kürzel des neuen Bereichs/Sparte</DialogContentText>
						<TextField autoFocus margin="dense" id="className" label="Bereich" type="text" fullWidth
									  value={this.state.newClassName}
									  onChange={e => this.setState({newClassName: e.target.value})}/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCloseDialog} name='cancel' color="secondary">Abbrechen</Button>
						<Button onClick={this.handleAddInsuranceClass} name='add' color="primary">Hinzufügen</Button>
					</DialogActions>
				</Dialog>
		);

		let view;
		if (isInEditMode) {
			view = <Grid container wrap={"nowrap"}>
				<Grid item xs={6}>
					<Paper>
						<TextField label="Name" type="text" value={insurer.name}
									  onChange={e => insurer.name = e.target.value}/>
						<AddressView address={insurer.address} editMode={isInEditMode}/>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper>
						<TextareaAutosize rowsMin={5} placeholder="Hinweise und weitergehende Informationen zum Versicherer"
												value={insurer.hints} onChange={e => insurer.hints = e.target.value}/>
					</Paper>
				</Grid>
			</Grid>
		}
		else {
			view = <Grid container wrap={"nowrap"}>
				<Grid item xs={12}>
					<Paper>
						<strong>{insurer.name}</strong>
						<i>{insurer.done ? ' -> DONE!' : ''}</i>
						<AddressView address={insurer.address} editMode={isInEditMode}/>
						<br/>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Typography component="pre" gutterBottom>{insurer.hints}</Typography>
				</Grid>
			</Grid>
		}

		return <ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
				{insurer.name}
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container wrap={"nowrap"}>
					<Grid item xs={6}>
						{view}
					</Grid>
					<Grid item xs={6}>
						{tabBar}{tabContent}{isInEditMode && addinsuranceClassDialog}
					</Grid>
				</Grid>
			</ExpansionPanelDetails>
			<Divider/>
			<ExpansionPanelActions>
				{isInEditMode && <IconButton color="primary" onClick={() => model.save(insurer)}><SaveIcon/></IconButton>}
				{!isInEditMode && <IconButton onClick={() => model.edit(insurer)}><EditIcon/></IconButton>}
				{!isInEditMode && <IconButton onClick={() => model.remove(insurer)}><DeleteIcon/></IconButton>}
			</ExpansionPanelActions>
		</ExpansionPanel>
	}
}

export default observer(InsurerView);
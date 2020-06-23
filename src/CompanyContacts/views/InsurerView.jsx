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
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from "@material-ui/core/Divider";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InsuranceClassesView from "./InsuranceClassesView";


class InsurerView extends React.Component {

	render() {
		const model = this.props.model
		const insurer = this.props.insurer
		const isInEditMode = model.editInsurer === insurer;

		let view;
		if (isInEditMode) {
			view = <Grid container wrap={"nowrap"}>
				<Grid item xs={6}>
					<Paper>
						<TextField label="Name" type="text" value={insurer.name} onChange={e => insurer.name = e.target.value}/>
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
					<Paper>
						<Typography component="pre" gutterBottom>{insurer.hints}</Typography>
					</Paper>
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
						<InsuranceClassesView insurer={insurer} editMode={isInEditMode}/>
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
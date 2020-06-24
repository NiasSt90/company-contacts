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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
	root: {
	},
	section1: {
		margin: theme.spacing(3, 2),
	},
	section2: {
		margin: theme.spacing(2),
	},
	section3: {
		margin: theme.spacing(3, 1, 1),
	},
}));

const InsurerView = observer((props) => {
	const classes = useStyles();
	const model = props.model
	const insurer = props.insurer
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
		view = <Card>
			<CardContent>
				<div className={classes.section1}>
					<Typography gutterBottom variant="h5" component="h2">{insurer.name}</Typography>
				</div>
				<div className={classes.section2}>
					<Typography variant="body2" color="textSecondary" component="p">
						<strong>{insurer.address.street} {insurer.address.number}</strong><br/>
						<strong>{insurer.address.zipCode} {insurer.address.city}</strong><br/>
					</Typography>
				</div>
				<Divider variant="middle"/>
				<div className={classes.section3}>
					<Typography component="pre" gutterBottom>{insurer.hints}</Typography>
				</div>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="edit">
					<EditIcon/>
				</IconButton>
			</CardActions>
		</Card>;
	}

	return <div className={classes.root}>
		<ExpansionPanel>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
				{insurer.name}
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<Grid container>
					<Grid item xs={12} md={6}>{view}</Grid>
					<Grid item xs={12} md={6}><InsuranceClassesView insurer={insurer} editMode={isInEditMode}/></Grid>
				</Grid>
			</ExpansionPanelDetails>
			<Divider/>
			<ExpansionPanelActions>
				{isInEditMode && <IconButton color="primary" onClick={() => model.save(insurer)}><SaveIcon/></IconButton>}
				{!isInEditMode && <IconButton onClick={() => model.edit(insurer)}><EditIcon/></IconButton>}
				{!isInEditMode && <IconButton onClick={() => model.remove(insurer)}><DeleteIcon/></IconButton>}
			</ExpansionPanelActions>
		</ExpansionPanel>
	</div>
});

export default InsurerView;
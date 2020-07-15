import React from "react";
import {observer} from "mobx-react";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import IconButton from "@material-ui/core/IconButton";
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import Box from "@material-ui/core/Box";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditIcon from "@material-ui/icons/Edit";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useRoles} from "../../hooks/useRoles";
import {useConfirmation} from "../../utils/ConfirmationService";
import {Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
	primaryHead: {
		color: theme.palette.text.header,
	},
	icon: {
		marginRight: theme.spacing(1),
		float: 'left',
		fontSize: "medium",
	},
}));

const ContactPersonView = observer(({person, onEdit, onDelete}) => {
	const classes = useStyles();
	const {isManager} = useRoles();
	const confirm = useConfirmation();
	const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

	const handleOpenMenuClick = (event) => {setMenuAnchorEl(event.currentTarget);};
	const handleCloseMenu = () => {setMenuAnchorEl(null);};
	const editPerson = () => {
		handleCloseMenu();
		onEdit(person);
	}
	const tryToDelete = () => {
		handleCloseMenu();
		confirm({
			variant: "danger",
			title: `Möchten Sie die Kontaktdaten für ${person.name} wirklich löschen?`,
			description: "Die Aktion kann nicht rückgängig gemacht werden...."
		}).then(() => onDelete(person));
	};

	return <>
		<ListItem alignItems={"flex-start"}>
			<ListItemAvatar>
				<Avatar>{person.name.charAt(0)}</Avatar>
			</ListItemAvatar>
			<ListItemText
					primary={<Typography className={classes.primaryHead}><strong>{person.topic}: </strong> {person.name}</Typography>}
					secondary={

						<Grid container spacing={1} >

								{person.mail && <Grid item xs={12} md={6}>
									<MailIcon className={classes.icon}/>
									<Typography component="a" variant="subtitle2" className={classes.primaryHead} fontSize="small"
													href={'mailto:' + person.mail}>{person.mail}</Typography>
								</Grid>}
								{person.phone && <Grid item xs={12} md={6}>
									<PhoneIcon className={classes.icon}/>
									<Typography component="span" variant="body2"
													fontSize="small">{person.phone}</Typography>
								</Grid>}
								{person.cellPhone && <Grid item xs={12} md={6}>
									<SmartphoneIcon className={classes.icon}/>
									<Typography component="span" variant="body2"
													fontSize="small">{person.cellPhone}</Typography>
								</Grid>}
								{person.fax && <Grid item xs={12} md={6}>
									<PrintIcon className={classes.icon}/>
									<Typography component="span" variant="body2"
													fontSize="small">{person.fax}</Typography>
								</Grid>}
							</Grid>
					}
			/>
			{isManager() &&
			 <ListItemSecondaryAction>
				 <IconButton onClick={handleOpenMenuClick}><MoreVertIcon/></IconButton>
				 <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
					 <MenuItem onClick={editPerson}>
						 <ListItemIcon><EditIcon fontSize="small"/></ListItemIcon>
						 <ListItemText>Bearbeiten</ListItemText>
					 </MenuItem>
					 <MenuItem onClick={tryToDelete}>
						 <ListItemIcon><DeleteIcon fontSize="small"/></ListItemIcon>
						 <ListItemText>Entfernen</ListItemText>
					 </MenuItem>
				 </Menu>
			 </ListItemSecondaryAction>

			}
		</ListItem>
		<Divider variant="inset" component="li" />
	</>
});

export default ContactPersonView;

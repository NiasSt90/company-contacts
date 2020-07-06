import React from "react";
import {observer} from "mobx-react";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import IconButton from "@material-ui/core/IconButton";
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import Box from "@material-ui/core/Box";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ConfirmDialog from "./ConfirmDialog";
import ContactPersonEditor from "./ContactPersonEditor";
import EditIcon from "@material-ui/icons/Edit";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useRoles} from "../../hooks/useRoles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper,
		'& span': {
			margin: theme.spacing(0, 0.5),
		},
	},
	inline: {
		display: 'inline',
	},
}));

const ContactPersonView = observer(({person, onEdit, onDelete}) => {
	const classes = useStyles();
	const {isManager} = useRoles();
	const [deleteConfirm, setDeleteConfirm] = React.useState(false);
	const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

	const deletePerson = () => {onDelete(person);}
	const handleOpenMenuClick = (event) => {setMenuAnchorEl(event.currentTarget);};
	const handleCloseMenu = () => {setMenuAnchorEl(null);};

	return <>
		<ListItem>
			<ListItemAvatar>
				<Avatar>{person.name.charAt(0)}</Avatar>
			</ListItemAvatar>
			<ListItemText
					primary={<Typography><strong>{person.topic}</strong> {person.name}</Typography>}
					secondary={
						<Box display="flex" component="span">
							{person.mail && <Box flexGrow={1} component="span">
								<MailIcon/><Typography component="a" variant="subtitle2" color="textPrimary"
															  href={'mailto:' + person.mail}>{person.mail}</Typography>
							</Box>}
							{person.phone && <Box flexGrow={1} component="span">
								<PhoneIcon/>
								<Typography component="span" variant="body2"
												color="textPrimary">{person.phone}</Typography>
							</Box>}
							{person.cellPhone && <Box flexGrow={1} component="span">
								<SmartphoneIcon/>
								<Typography component="span" variant="body2"
												color="textPrimary">{person.cellPhone}</Typography>
							</Box>}
							{person.fax && <Box flexGrow={1} component="span">
								<PrintIcon/>
								<Typography component="span" variant="body2"
												color="textPrimary">{person.fax}</Typography>
							</Box>}
						</Box>
					}
			/>
			{isManager() &&
			 <ListItemSecondaryAction>
				 <IconButton onClick={handleOpenMenuClick}><MoreVertIcon/></IconButton>
				 <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
					 <MenuItem onClick={() => {
						 onEdit(person);
						 handleCloseMenu()
					 }}>
						 <ListItemIcon><EditIcon fontSize="small"/></ListItemIcon>
						 <ListItemText>Bearbeiten</ListItemText>
					 </MenuItem>
					 <MenuItem onClick={() => {
						 setDeleteConfirm(true);
						 handleCloseMenu()
					 }}>
						 <ListItemIcon><DeleteIcon fontSize="small"/></ListItemIcon>
						 <ListItemText>Entfernen</ListItemText>
					 </MenuItem>
				 </Menu>
			 </ListItemSecondaryAction>
			}
		</ListItem>
		{isManager() &&
		 <>
			 <ConfirmDialog title="Kontakt löschen?" open={deleteConfirm} setOpen={setDeleteConfirm}
								 onConfirm={deletePerson}>
				 Möchten Sie die Kontaktdaten für {person.name} wirklich löschen?
			 </ConfirmDialog>
		 </>
		}
	</>
});

export default ContactPersonView;

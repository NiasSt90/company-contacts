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

const ContactPersonView = observer(({person, onEdit, onDelete}) => {
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
	</>
});

export default ContactPersonView;

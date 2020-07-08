import React from "react";
import {observer} from "mobx-react";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditIcon from "@material-ui/icons/Edit";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from "@material-ui/core/Link";
import {useConfirmation} from "../../utils/ConfirmationService";

const ContactLinkView = observer(({link, onEdit, onDelete}) => {
	const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
	const handleOpenMenuClick = (event) => {setMenuAnchorEl(event.currentTarget);};
	const handleCloseMenu = () => {setMenuAnchorEl(null);};
	const confirm = useConfirmation();
	const tryToDelete = () => {
		handleCloseMenu();
		confirm({
			variant: "danger",
			title: `Möchten Sie den Link "${link.name}" wirklich löschen?`,
			description: "Die Aktion kann nicht rückgängig gemacht werden...."
		}).then(() => onDelete(link));
	};

	return <>
		<ListItem>
			<ListItemAvatar>
				<Avatar>{link.name.charAt(0)}</Avatar></ListItemAvatar>
			<ListItemText
					primary={<Link href={link.url} target="_blank" rel="noreferrer">{link.name}</Link>}
					secondary={link.description}
			/>
			<ListItemSecondaryAction>
				<IconButton onClick={handleOpenMenuClick}><MoreVertIcon/></IconButton>
				<Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleCloseMenu}>
					<MenuItem onClick={() => {onEdit(link);handleCloseMenu()}}>
						<ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
						<ListItemText>Bearbeiten</ListItemText>
					</MenuItem>
					<MenuItem onClick={tryToDelete}>
						<ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
						<ListItemText>Entfernen</ListItemText>
					</MenuItem>
				</Menu>
			</ListItemSecondaryAction>
		</ListItem>
	</>
});

export default ContactLinkView;

import React from "react";
import {observer} from "mobx-react";
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ConfirmDialog from "./ConfirmDialog";
import EditIcon from "@material-ui/icons/Edit";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContactLinkEditor from "./ContactLinkEditor";
import Link from "@material-ui/core/Link";

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

const ContactLinkView = observer(({link, onEdit, onDelete}) => {
	const classes = useStyles();
	const [deleteConfirm, setDeleteConfirm] = React.useState(false);
	const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

	const deleteLink = () => {onDelete(link);}
	const handleOpenMenuClick = (event) => {setMenuAnchorEl(event.currentTarget);};
	const handleCloseMenu = () => {setMenuAnchorEl(null);};

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
					<MenuItem onClick={() => {setDeleteConfirm(true);handleCloseMenu()}}>
						<ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
						<ListItemText>Entfernen</ListItemText>
					</MenuItem>
				</Menu>
			</ListItemSecondaryAction>
		</ListItem>
		<ConfirmDialog title="Link löschen?" open={deleteConfirm} setOpen={setDeleteConfirm} onConfirm={deleteLink}>
			Möchten Sie den Link {link.name} wirklisch löschen?
		</ConfirmDialog>
	</>
});

export default ContactLinkView;

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Switch from "@material-ui/core/Switch";
import MoreIcon from "@material-ui/icons/MoreVert";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import {observer} from "mobx-react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useRoles} from "./hooks/useRoles";
import Tooltip from "@material-ui/core/Tooltip";
import {useStores} from "./hooks/useStores";
import {useHistory} from "react-router";
import HomeIcon from '@material-ui/icons/Home';
import ClearIcon from '@material-ui/icons/Clear';
import {ArrowBack, Brightness4, Brightness7} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.black, 0.12),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.black, 0.25),
		},

		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}))

const MyAppBar = observer(({props}) => {
	const classes = useStyles();
	const {toolbarHandler, themeStore, authStore, activityHandler } = useStores();
	const {authenticated, login, logout} = useRoles();
	const history = useHistory();
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	return <div className={classes.grow}>
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" className={classes.menuButton} onClick={() => history.push("/")}>
					{toolbarHandler.showSearch && <HomeIcon color={'secondary'}/>}
					{!toolbarHandler.showSearch && <ArrowBack color={'secondary'}/>}
				</IconButton>
				<Typography className={classes.title} variant="h6" color={'secondary'} noWrap>{toolbarHandler.title}</Typography>
				{toolbarHandler.showSearch && <div className={classes.search}>
					<div className={classes.searchIcon}><SearchIcon color={'secondary'}/></div>
					<InputBase onChange={toolbarHandler.searchAction} placeholder="Suchen…"
								  classes={{ input: classes.inputInput,}} value={toolbarHandler.searchValue}
								  endAdornment={<ClearIcon color={"secondary"} onClick={toolbarHandler.clearSearch} />} />
				</div>}
				<div className={classes.grow}/>
				<div className={classes.sectionDesktop}>
					{toolbarHandler.showDefaultActions && <>
						<Tooltip title="Theme wechseln">
							<Switch checked={themeStore.darkState} icon={<Brightness7 color={'secondary'}/>} checkedIcon={<Brightness4 color={'secondary'} />} onChange={themeStore.handleThemeChange}/>
						</Tooltip>
					{!authenticated() &&
					 <Tooltip title="Anmelden...">
						 <IconButton edge="end" onClick={() => login()} ><LockOpenIcon color={'secondary'}/></IconButton>
					 </Tooltip>
					}
					{authenticated() &&
					 <Tooltip title={"Angemeldet als " + authStore.name}>
						 <IconButton edge="end" onClick={() => logout()}><LockIcon color={'secondary'}/></IconButton>
					 </Tooltip>
					}
					</>}
					{toolbarHandler.actions.map(({name, label, icon, ...rest}) => (
							<Tooltip key={name} title={label}>
								<IconButton color={'secondary'} edge="end"  {...rest}>{icon}</IconButton>
							</Tooltip>
					))}
				</div>
				<div className={classes.sectionMobile}>
					<IconButton onClick={handleMobileMenuOpen} color="inherit">
						<MoreIcon color={'secondary'}/>
						{/*TODO: ...Menu muss noch  implementiert werden*/}
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>

		{activityHandler.state === "pending" && <LinearProgress variant="indeterminate" color="secondary"/>}
		<Snackbar
				open={activityHandler.messageState}
				onClose={activityHandler.resetMessageState}
				autoHideDuration={5000}>
			<MuiAlert elevation={6} variant="filled" onClose={activityHandler.resetMessageState}
						 severity={activityHandler.messageSeverity}>
				{activityHandler.message ? activityHandler.message.toString() : ""}
			</MuiAlert>
		</Snackbar>
	</div>
})

export default MyAppBar;
import React, {useState} from 'react';
import './App.css';
import InsurerViewModel from "./CompanyContacts/InsurerViewModel";
import InsurerListView from "./CompanyContacts/views/InsurerListView";
import {createMuiTheme, fade, ThemeProvider} from "@material-ui/core";
import {blue, red} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import orange from "@material-ui/core/colors/orange";
import deepOrange from "@material-ui/core/colors/deepOrange";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import MoreIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from '@material-ui/icons/Refresh';
import LinearProgress from "@material-ui/core/LinearProgress";
import {observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
	root: {
		display: "grid"
	},

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
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
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

// create a viewModel singleton
const model = new InsurerViewModel()

const App = observer( () =>  {
	const [darkState, setDarkState] = useState(false);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const handleThemeChange = () => {
		setDarkState(!darkState);
	};
	const palletType = darkState ? "dark" : "light";
	const mainPrimaryColor = darkState ? orange[500] : blue[500];
	const mainSecondaryColor = darkState ? deepOrange[900] : red[500];
	const selectedTheme = createMuiTheme({
		palette: {
			type: palletType,
			primary: {main: mainPrimaryColor},
			secondary: {main: mainSecondaryColor}
		}
	});
	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const classes = useStyles();
	return (
			<ThemeProvider theme={selectedTheme}>
				<div className={classes.root}>
					<CssBaseline/>
					<div className="App">
						<div className={classes.grow}>
							<AppBar position="static">
								<Toolbar>
									<IconButton edge="start" className={classes.menuButton}
													color="inherit"><MenuIcon/></IconButton>
									<Typography className={classes.title} variant="h6" noWrap>Versicherungs -
										Ansprechpartner</Typography>
									<div className={classes.search}>
										<div className={classes.searchIcon}><SearchIcon/></div>
										<InputBase onChange={(e) => model.search(e.target.value)}
												placeholder="Search…"
												classes={{
													root: classes.inputRoot,
													input: classes.inputInput,
												}}
										/>
									</div>
									<div className={classes.grow}/>
									<div className={classes.sectionDesktop}>
										<Switch checked={darkState} onChange={handleThemeChange}/>
										<IconButton edge="end" onClick={() => model.load()} color="inherit"><RefreshIcon/></IconButton>
										<IconButton edge="end" onClick={() => model.add()} color="inherit"><AddIcon/></IconButton>
										<IconButton edge="end" onClick={() => model.saveAll()}
														color="inherit"><SaveIcon/></IconButton>
									</div>
									<div className={classes.sectionMobile}>
										<IconButton onClick={handleMobileMenuOpen} color="inherit">
											<MoreIcon/>
										</IconButton>
									</div>
								</Toolbar>
							</AppBar>
						</div>
						<InsurerListView model={model}/>
					</div>
				</div>
			</ThemeProvider>
	);
});

export default App;

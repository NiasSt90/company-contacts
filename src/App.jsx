import React, {useState} from 'react';
import './App.css';
import InsurerViewModel from "./CompanyContacts/InsurerViewModel";
import InsurerListView from "./CompanyContacts/views/InsurerListView";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {blue, red} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import orange from "@material-ui/core/colors/orange";
import deepOrange from "@material-ui/core/colors/deepOrange";

const useStyles = makeStyles(theme => ({
	root: {
		display: "grid"
	},
}))

// create a viewModel singleton
const model = new InsurerViewModel()

function App() {
	const [darkState, setDarkState] = useState(false);
	const handleThemeChange = () => {setDarkState(!darkState);};
	const palletType = darkState ? "dark" : "light";
	const mainPrimaryColor = darkState ? orange[500] : blue[500];
	const mainSecondaryColor = darkState ? deepOrange[900] : red[500];
	const selectedTheme = createMuiTheme({
		palette: {
			type: palletType,
			primary: {		main: mainPrimaryColor		},
			secondary: {	main: mainSecondaryColor	}
		}
	});
	const classes = useStyles();
	return (
			<ThemeProvider theme={selectedTheme}>
				<div className={classes.root}>
					<CssBaseline/>
					<div className="App">
						<InsurerListView model={model}/>
						Theme-Switch:<Switch checked={darkState} onChange={handleThemeChange} />
					</div>
				</div>
			</ThemeProvider>
	);
}

export default App;

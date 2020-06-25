import React, {useState} from 'react';
import './App.css';
import InsurerViewModel from "./CompanyContacts/InsurerViewModel";
import InsurerListView from "./CompanyContacts/views/InsurerListView";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {blue, red} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import orange from "@material-ui/core/colors/orange";
import deepOrange from "@material-ui/core/colors/deepOrange";
import {observer} from "mobx-react";
import MyAppBar from "./MyAppBar";
import keycloak from "./keycloak";
import CircularProgress from "@material-ui/core/CircularProgress";
import {KeycloakProvider} from "@react-keycloak/web";

const useStyles = makeStyles(theme => ({
	root: {
		display: "grid"
	},
}))

// create a viewModel singleton
const model = new InsurerViewModel("http://localhost:8080/contact")

const App = observer( () =>  {
	const classes = useStyles();
	const [darkState, setDarkState] = useState(false);
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
	const onToken = (tokens) => {
		sessionStorage.setItem('kc-token', tokens.token);
		model.load();
	}
	return (
		<KeycloakProvider
			autoRefreshToken LoadingComponent={<CircularProgress/>}
			onTokens={onToken}
			keycloak={keycloak} initConfig={{onLoad: 'check-sso', promiseType: 'native'}}>
			<ThemeProvider theme={selectedTheme}>
				<div className={classes.root}>
					<CssBaseline/>
					<div className="App">
						<MyAppBar model={model} darkState={darkState} handleThemeChange={handleThemeChange}/>
						<InsurerListView model={model}/>
					</div>
				</div>
			</ThemeProvider>
		</KeycloakProvider>
	);
});

export default App;

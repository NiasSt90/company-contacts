import React from 'react';
import './App.css';
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
import MuiAlert from "@material-ui/lab/Alert";
import {useStores} from "./hooks/useStores";

const useStyles = makeStyles(theme => ({
	root: {
		display: "grid"
	},
}))

const App = observer( () =>  {
	const classes = useStyles();
	const { authStore, insurerModel, themeStore } = useStores();
	const palletType = themeStore.darkState ? "dark" : "light";
	const mainPrimaryColor = themeStore.darkState ? orange[500] : blue[500];
	const mainSecondaryColor = themeStore.darkState ? deepOrange[900] : red[500];
	const selectedTheme = createMuiTheme({
		palette: {
			type: palletType,
			primary: {main: mainPrimaryColor},
			secondary: {main: mainSecondaryColor}
		},
		overrides: {
			MuiFab: {
				root: {
					position: "fixed",
					bottom: 16,
					right: 16,
				}
			}
		}
	});
	const onToken = (tokens) => {
		authStore.token = tokens.token;
		authStore.keycloak = keycloak;
	}
	const onKeycloakEvent = (event, error) => {
		console.log('onKeycloakEvent: ', event, error)
		switch (event) {
			case "onReady":
				insurerModel.load();
				authStore.init();
				break;
			case "onAuthSuccess":
			break;
			case "onAuthError":
			case "onAuthRefreshSuccess":
			case "onAuthRefreshError":
			case "onTokenExpired":
			case "onAuthLogout":
				break;
			default:
		}
	}
	return (
		<KeycloakProvider
				keycloak={keycloak}
				initConfig={{onLoad: 'login-required', promiseType: 'native', checkLoginIframe: true}}
				LoadingComponent={<CircularProgress/>} onEvent={onKeycloakEvent} onTokens={onToken}>
			<ThemeProvider theme={selectedTheme}>
				<div className={classes.root}>
					<CssBaseline/>
					<div className="App">
						<MyAppBar model={insurerModel}/>
						<InsurerListView model={insurerModel}/>

						<MuiAlert elevation={6} variant="filled" severity={"warning"}>
							Diese Anwendung ist als technical-Preview zu betrachten.<br/>
							Aktuell darf jeder alles Anlegen/Bearbeiten/Löschen....
						</MuiAlert>
					</div>
				</div>
			</ThemeProvider>
		</KeycloakProvider>
	);
});

export default App;

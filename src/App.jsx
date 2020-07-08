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
import {Route, Switch} from 'react-router-dom';
import {ConfirmationServiceProvider} from "./utils/ConfirmationService";
import InsurerContainer from "./CompanyContacts/InsurerContainer";
import DownloadContainer from "./CompanyContacts/DownloadContainer";

const useStyles = makeStyles(theme => ({
	root: {
		display: "grid"
	},
}))

const App = observer(() => {
	const classes = useStyles();
	const {authStore, insurerModel, themeStore} = useStores();
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
	return (
			<KeycloakProvider
					keycloak={keycloak} initConfig={{onLoad: 'check-sso', promiseType: 'native', checkLoginIframe: true}}
					LoadingComponent={<CircularProgress/>} onEvent={authStore.onKeycloakEvent} onTokens={authStore.onToken}>
				<ThemeProvider theme={selectedTheme}>
					<div className={classes.root}>
						<CssBaseline/>
						<div className="App">

							<ConfirmationServiceProvider>
								<MyAppBar model={insurerModel}/>
								{authStore.token &&
								 <Switch>
									 <Route exact path='/'><InsurerListView model={insurerModel}/></Route>
									 <Route exact path='/insurer'><InsurerContainer/></Route>
									 <Route path='/insurer/:id'><InsurerContainer/></Route>
									 <Route path='/download/:id'><DownloadContainer/></Route>
								 </Switch>
								}
							</ConfirmationServiceProvider>

						</div>
					</div>
				</ThemeProvider>
			</KeycloakProvider>
	);
});

export default App;

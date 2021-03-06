import React from 'react';
import './App.css';
import {ThemeProvider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {observer} from "mobx-react";
import MyAppBar from "./MyAppBar";
import keycloak from "./keycloak";
import CircularProgress from "@material-ui/core/CircularProgress";
import {KeycloakProvider} from "@react-keycloak/web";
import {useStores} from "./hooks/useStores";
import {Route, Switch} from 'react-router-dom';
import {ConfirmationServiceProvider} from "./utils/ConfirmationService";
import InsurerContainer from "./CompanyContacts/InsurerContainer";
import DownloadContainer from "./CompanyContacts/DownloadContainer";
import InsurerListContainer from "./CompanyContacts/InsurerListContainer";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
	root: {
		display: "grid"
	},
}))

const App = observer(() => {
	const classes = useStyles();
	const {authStore, themeStore} = useStores();
	return (
			<KeycloakProvider
					keycloak={keycloak} initConfig={{onLoad: 'login-required', promiseType: 'native', checkLoginIframe: true}}
					LoadingComponent={<CircularProgress/>} onEvent={authStore.onKeycloakEvent} onTokens={authStore.onToken}>
				<ThemeProvider theme={themeStore.selectedTheme}>
					<div className={classes.root}>
						<CssBaseline/>
						<div className="App">
							<ConfirmationServiceProvider>
								<MyAppBar/>
								{authStore.token ?
								 <Switch>
								 <Route exact path='/'><InsurerListContainer/></Route>
									<Route exact path='/insurer'><InsurerContainer/></Route>
									<Route path='/insurer/:id'><InsurerContainer/></Route>
									<Route path='/download/:id'><DownloadContainer/></Route>
									</Switch>
								 : <Container maxWidth={"xs"}><Typography variant="h5">Sie sind nicht angemeldet</Typography></Container>
								}
							</ConfirmationServiceProvider>
						</div>
					</div>
				</ThemeProvider>
			</KeycloakProvider>
	);
});

export default App;

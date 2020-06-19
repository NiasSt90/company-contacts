import React from 'react';
import './App.css';
import InsurerViewModel from "./CompanyContacts/InsurerViewModel";
import InsurerListView from "./CompanyContacts/views/InsurerListView";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {blue, red, yellow} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: yellow,
		type: 'light'
	}
})

const useStyles = makeStyles(theme => ({
	root: {
		display: "grid"
	},
}))

// create a viewModel singleton
const model = new InsurerViewModel()

function App() {
	const classes = useStyles();
	return (
			<ThemeProvider theme={theme}>
				<div className={classes.root}>
					<CssBaseline/>
					<div className="App">
						<InsurerListView model={model}/>
					</div>
				</div>
			</ThemeProvider>
	);
}

export default App;

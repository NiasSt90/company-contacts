import {action, decorate, observable} from 'mobx'
import orange from "@material-ui/core/colors/orange";
import {blue, red} from "@material-ui/core/colors";
import deepOrange from "@material-ui/core/colors/deepOrange";
import {createMuiTheme} from "@material-ui/core";

class ThemeStore {
	darkState = false;

	constructor() {
		this.buildTheme();
	}

	buildTheme() {
		const palletType = this.darkState ? "dark" : "light";
		const mainPrimaryColor = this.darkState ? orange[500] : blue[500];
		const mainSecondaryColor = this.darkState ? deepOrange[900] : red[500];
		this.selectedTheme = createMuiTheme({
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
	}

	handleThemeChange = () => {
		this.darkState = !this.darkState;
		this.buildTheme();
	};
}

decorate(ThemeStore, {
	darkState: observable,
	selectedTheme: observable,
	handleThemeChange: action,
});
export default ThemeStore;

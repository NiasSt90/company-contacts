import {action, decorate, observable} from 'mobx'

class ThemeStore {
	darkState = false;

	theme = 'light'

	setTheme(newTheme) {
		this.theme = newTheme
	}


	handleThemeChange = () => {
		this.darkState = !this.darkState;
	};

}

decorate(ThemeStore, {
	theme: observable,
	darkState: observable,

	handleThemeChange: action,
	setTheme: action
});
export default ThemeStore;

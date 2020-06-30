import {action, decorate, observable} from 'mobx'

class ThemeStore {
	theme = 'light'

	setTheme(newTheme) {
		this.theme = newTheme
	}
}

decorate(ThemeStore, {
	theme: observable,
	setTheme: action
});
export default ThemeStore;

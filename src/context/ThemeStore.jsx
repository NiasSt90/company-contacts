import {action, decorate, observable} from "mobx"
import {createMuiTheme} from "@material-ui/core";

class ThemeStore {
	darkState = false;

	constructor() {
		this.buildTheme();
	}

	buildTheme() {
		const palletType = this.darkState ? "dark" : "light";

		const mainPrimaryColor = this.darkState ? '#064063' : '#009fe3';
		const mainSecondaryColor = this.darkState ? '#4DC9FF' : '#ffffff';
		const mainErrorColor = this.darkState ? '#E31738' : '#E31738';

		const textPrimaryColor = this.darkState ? '#f1f0f0' : '#021a26';
		const textSecondaryColor = this.darkState ? '#dedede' : '#909090';

		const primaryContrastColor = this.darkState ? '#064063' : '#FFF';
		const secondaryContrastColor = this.darkState ? '#064063' : '#FFF';
		const errorContrastColor = this.darkState ? '#f1f0f0' : '#FFF';

		const paperBackground = this.darkState ? '#0e3e5a' : '#FFF';
		const palletBackground = this.darkState ? '#05182f' : '#ecedee';
		const headerBackground = this.darkState ? '#042c45' : '#f6f7f8';

		const headerText = this.darkState ? '#4DC9FF' : '#009fe3';

		const primaryTextButtonColor = this.darkState ? '#4DC9FF' : '#009fe3';
		const secondaryTextButtonColor = this.darkState ? '#fff' : '#064063';
		const primaryTextButtonColorOver = this.darkState ? '#36a2d2' : '#0073a5';
		const secondaryTextButtonColorOver = this.darkState ? '#cecece' : '#001724';

		const primaryBackgroundButtonColor = this.darkState ? '#4DC9FF' : '#009fe3';
		const secondaryBackgroundButtonColor = this.darkState ? '#FFF' : '#064063';
		const primaryBackgroundButtonColorOver = this.darkState ? '#36a2d2' : '#0073a5';
		const secondaryBackgroundButtonColorOver = this.darkState ? '#cecece' : '#001724';

		const tabIndicatorColor = this.darkState ? '#4DC9FF' : '#009fe3';

		const minHeightForTabsAndBars = 64;
		const inputColor = this.darkState ? 'secondary' : 'primary';

		this.selectedTheme = createMuiTheme({


			shape:{
				borderRadius: 3,
			},
			palette: {
				type: palletType,
				background: {
					default:palletBackground,
					paper:paperBackground,
					header: headerBackground,
				},
				primary: {
					main: mainPrimaryColor,
					contrastText: primaryContrastColor,
				},
				secondary: {
					main: mainSecondaryColor,
					contrastText: secondaryContrastColor,
				},

				error: {
					main: mainErrorColor,
					contrastText: errorContrastColor,
				},

				text: {
					primary: textPrimaryColor,
					secondary: textSecondaryColor,
					header: headerText,
				},
			},
			typography: {

				fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
				h6: {
					fontSize: '1rem',
					textTransform: 'uppercase',
					color: headerText,
				},
				h5: {
					fontSize: '1.5rem',
					color: headerText,
				},
				h4: {
					fontSize: '1.5rem',
					color: headerText,
					padding: 16,
				},
			},
			spacing: [0, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096],
			props: {
				MuiButton: {
					size: 'medium',
				},
				MuiListItem: {
					dense: true,
				},
				MuiIconButton: {
					size: 'small',
					color: "primary"
				},
				MuiTypography: {
					variantMapping: {
						h1: 'h2',
						h2: 'h2',
						h3: 'h2',
						h4: 'h2',
						h5: 'h2',
						h6: 'h2',
						subtitle1: 'h2',
						subtitle2: 'h2',
						body1: 'span',
						body2: 'span',
					},
				},
				MuiFab: {
					size: 'small',
					color: 'secondary'
				},
				MuiTable: {
					size: 'medium',
				},
				MuiInputBase:{
					color: inputColor
				},
				MuiInputLabel:{
					color: inputColor
				}
			},
			overrides: {
				MuiFab: {
					root: {
						position: "fixed",
						bottom: 16,
						right: 16,
					},
					primary: {
						backgroundColor: primaryBackgroundButtonColor,
					},
					secondary: {
						backgroundColor: secondaryBackgroundButtonColor,
					}
				},
				MuiTableRow: {
					root: {
						'&:nth-of-type(odd)': {
							backgroundColor: headerBackground,
						},
					},
				},
				MuiTablePagination:{

					root: {
						backgroundColor: headerBackground,
					},
				},
				MuiTableCell:{
					head: {
						color:headerText,
						background: headerBackground,
						minHeight: minHeightForTabsAndBars,
					},
					stickyHeader: {
						color:headerText,
						background: headerBackground,
						minHeight: minHeightForTabsAndBars,
					}
				},
				MuiTabs: {
					indicator:{
						borderBottom: '2px solid ' + tabIndicatorColor,
						color: tabIndicatorColor
					},
					root:{
						minHeight: minHeightForTabsAndBars,
					}
				},
				MuiTab: {
					root:{
						minHeight: minHeightForTabsAndBars
					}

				},

				MuiCard: {
					root:{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					},
				},

				MuiCardActions: {
					root:{
						boxSizing: 'border-box',
						padding: 16,
						width: '100%',
					}
				},
				MuiCardHeader: {
					root:{
						boxSizing: 'border-box',
						padding: 16,
						width: '100%',
						backgroundColor: headerBackground,
						color: headerText,
					}
				},
				MuiCardContent: {
					root:{
						height: '100%'
					},
				},
				MuiAppBar: {
					root:{
						minHeight: minHeightForTabsAndBars,
					},
				},

				MuiButton:{
					textPrimary: {
						color: primaryTextButtonColor,
				'&:hover': {
					color: primaryTextButtonColorOver,
				},
				'&:focus': {
					color: primaryTextButtonColorOver,
				},
					},
					textSecondary: {
						color: secondaryTextButtonColor,
				'&:hover': {
					color: secondaryTextButtonColorOver,
				},
				'&:focus': {
					color: secondaryTextButtonColorOver,
				},
					},
					containedPrimary:{
						backgroundColor: primaryBackgroundButtonColor,
				color: primaryContrastColor,
				'&:hover': {
					backgroundColor: primaryBackgroundButtonColorOver,
				},
				'&:focus': {
					backgroundColor: primaryBackgroundButtonColorOver,
				},
					},
					containedSecondary:{
						backgroundColor: secondaryBackgroundButtonColor,
				color: secondaryContrastColor,
				'&:hover': {
					backgroundColor: secondaryBackgroundButtonColorOver,
				},
				'&:focus': {
					backgroundColor: secondaryBackgroundButtonColorOver,
				},

					},
					outlinedPrimary:{
						borderColor: primaryBackgroundButtonColor,
				color: primaryTextButtonColor,
				'&:hover': {
					borderColor: primaryBackgroundButtonColorOver,
					color: primaryTextButtonColorOver,
				},
				'&:focus': {
					borderColor: primaryBackgroundButtonColorOver,
					color: primaryTextButtonColorOver,
				},
					},
					outlinedSecondary:{
						borderColor: secondaryBackgroundButtonColor,
				color: secondaryTextButtonColor,

				'&:hover': {
					borderColor: secondaryBackgroundButtonColorOver,
					color: secondaryTextButtonColorOver,
				},
				'&:focus': {
					borderColor: secondaryBackgroundButtonColorOver,
					color: secondaryTextButtonColorOver,
				},
					}

				},
				MuiIconButton:{
					colorPrimary: {
						color: primaryTextButtonColor,
					},
					colorSecondary: {
						color: secondaryTextButtonColor,
					}
				},
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

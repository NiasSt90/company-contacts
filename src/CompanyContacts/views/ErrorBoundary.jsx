import withStyles from "@material-ui/core/styles/withStyles";
import React, {Component} from "react";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
	error: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.error.contrastText
	}
})

const ErrorBoundary = withStyles(styles) (
		class extends Component {
			state = {error: null};

			onClose = () => {
				this.setState({error: null});
			};

			componentDidCatch(error, errorInfo) {
				this.setState({error});
			}

			render() {
				const { classes } = this.props;
				return (<React.Fragment>
							{this.state.error === null && this.props.children}
							<Snackbar
								open={Boolean(this.state.error)}
								message={ this.state.error !== null && this.state.error.toString() }
								ContentProps={{ classes: { root: classes.error } }}
							/>
						</React.Fragment>);
			}
		}
);
export default ErrorBoundary;

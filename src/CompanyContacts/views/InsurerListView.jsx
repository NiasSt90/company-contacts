import React from 'react'
import {observer} from 'mobx-react'
import InsurerView from "./InsurerView";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

// This is a React component.
// The property "model" of the passed props object is an instance of our ViewModel class.
// do you remember all those @observable and @computed?
// In order to let your React component automatically update whenever any of
// those observable property of an object in the component props update,
// you should pass your component to the "observer" function/decorator
/*@observer*/ class InsurerListView extends React.Component{

	render(){

		const model = this.props.model

		// just some HTML markup based of the ViewModel data.
		return <React.Fragment>
			<Typography component="h1" variant="h2">React & MobX Insurer List!</Typography>
			<Button onClick={() => model.add()} variant="contained">New Insurer</Button>
			<Button onClick={() => model.load()} variant="contained">Reload Insurer</Button>
			<Button onClick={() => model.saveAll()} variant="contained">Save All Insurer</Button>
			{model.insurerList.map((insurer, i) =>
							<InsurerView key={i} model={model} insurer={insurer}/>
			)}
		</React.Fragment>
	}
}


export default observer(InsurerListView);

/*@observer*/ import React from "react";
import {observer} from "mobx-react";
import AddressView from "./AddressView";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class InsurerView extends React.Component{

	render(){
		const model = this.props.model
		const insurer = this.props.insurer

		let view = null;
		if (model.editInsurer !== insurer) {
			view = <div>
				<strong>{insurer.name}</strong>
				<i>{insurer.done ? ' -> DONE!' : ''}</i>
				<AddressView address={insurer.address} editMode={false}/>

				<br/>
				<button onClick={() => model.edit(insurer)}>Edit</button>
				</div>
		}
		else {
			view = <div>
				<strong>{insurer.name}</strong>
				<i>{insurer.done ? ' -> DONE!' : ''}</i>
				<AddressView address={insurer.address} editMode={true} />

				<br/>
				<input type="checkbox" checked={insurer.done} onChange={e => insurer.done = e.target.checked}/>
				<input type="text" value={insurer.name} onChange={e => insurer.name = e.target.value}/>

				<button onClick={() => model.save(insurer)}>Save</button>
				<button onClick={() => model.remove(insurer)}>Delete</button>
			</div>
		}
		return <ExpansionPanel>
					<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1c-content"
							id="panel1c-header">
						{insurer.name}
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>{view}</ExpansionPanelDetails>
				</ExpansionPanel>
	}
}
export default observer(InsurerView);
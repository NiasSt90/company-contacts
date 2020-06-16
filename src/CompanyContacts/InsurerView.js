import React from 'react'
import {observer} from 'mobx-react'

// This is a React component.
// The property "model" of the passed props object is an instance of our TodoViewModel class.
// do you remember all those @observable and @computed?
// In order to let your React component automatically update whenever any of
// those observable property of an object in the component props update,
// you should pass your component to the "observer" function/decorator
export @observer class InsurerView extends React.Component{

	render(){
		const model = this.props.model


		// just some HTML markup based of the ViewModel data.
		return <div>
			<h1>React & MobX Insurer List!</h1>
			<p>
				<button onClick={() => model.add()}>New Insurer</button>
				<button onClick={() => model.load()}>Reload Insurer</button>
				<button onClick={() => model.save()}>Save Insurer</button>
			</p>
			{model.insurerList.map((insurer, i) => <SingleInsurerView key={insurer.id} model={model} insurer={insurer} />)}
		</div>
	}
}

export @observer class SingleInsurerView extends React.Component{

	render(){
		const model = this.props.model
		const insurer = this.props.insurer

		return <p>
			#{insurer.id}
			<strong>{insurer.name}</strong>
			<i>{insurer.done ? 'DONE!' : ''}</i>

			<br/>

			<input type="checkbox" checked={insurer.done} onChange={e => insurer.done = e.target.checked} />
			<input type="text" value={insurer.text} onChange={e => insurer.name = e.target.value} />
			<button onClick={() => model.remove(insurer)}>Delete</button>
		</p>
	}
}
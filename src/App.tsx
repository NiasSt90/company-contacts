import React from 'react';
import './App.css';
import {InsurerView} from './CompanyContacts/InsurerView'
import {InsurerViewModel} from './CompanyContacts/InsurerViewModel'

// create a viewModel singleton
const model = new InsurerViewModel()

function App() {
  return (
    <div className="App">
      <InsurerView model={model} />
    </div>
  );
}

export default App;

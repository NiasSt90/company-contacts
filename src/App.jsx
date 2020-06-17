import React from 'react';
import './App.css';
import InsurerViewModel from "./CompanyContacts/InsurerViewModel";
import InsurerListView from "./CompanyContacts/views/InsurerListView";

// create a viewModel singleton
const model = new InsurerViewModel()

function App() {
  return (
    <div className="App">
      <InsurerListView model={model} />
    </div>
  );
}

export default App;

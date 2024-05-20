import React from 'react';
import './styles/App.css';
import FormToPdf from './components/FormToPdf';

const App: React.FC = () => {
  return (
    <div>
      <h1>PDF Generator</h1>
      <FormToPdf />
    </div>
  );
};

export default App

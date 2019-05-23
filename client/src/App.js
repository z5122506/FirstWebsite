import React from 'react';
// import { TrainAlgo } from './trainGame/Algo';
import './App.css';
import { TrainForm } from './trainGame/Form';

function App() {
  // const trainAlgo = new TrainAlgo([1,2,5,4], 10);
  // trainAlgo.calculateEvaluations();

  return (
    <div className="App">
      <TrainForm />
    </div>
  );
}

export default App;

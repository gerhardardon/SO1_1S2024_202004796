import React from "react";
import {useEffect, useState}from 'react';
import CreateDoughnutData from "./components/Graph.jsx";

function App() {
  const [freeRam, setFreeRam] = useState(0);
  const [freeCpu, setFreeCpu] = useState(0);

  return (
    <>
      <h1>SO1_202004796</h1>
      <h2>Ram</h2>
      <CreateDoughnutData free={80}  />
      <h2>Cpu</h2>
      <CreateDoughnutData free={20} />
    </>
  );
}

export default App;

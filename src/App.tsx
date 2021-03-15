import React from 'react';
// import logo from './logo.svg';
import './App.css';
import GraphView, { GEdge, GNode } from './Components/GraphView';

const nodes:GNode[] = [
  {
    id:1,
    type:"default",
    x:200,
    y:200,
    backgroundColor:"#122188",
    borderColor:"#555588",
    text:"First node.",
    subtext:"The first node is very important because it ads a lot of complexity to the scene. The first node is very important because it ads a lot of complexity to the scene. The first node is very important because it ads a lot of complexity to the scene."
  },
  {
    id:2,
    type:"default",
    x:400,
    y:200,
    backgroundColor:"#991212",
    borderColor:"#995555",
    text:"Second node.",
    subtext:"The first node is very important because it ads a lot of complexity to the scene."
  },
  {
    id:3,
    type:"default",
    x:200,
    y:400,
    backgroundColor:"#128812",
    borderColor:"#558855",
    text:"Third node."
  },
  {
    id:4,
    type:"default",
    x:400,
    y:400,
    backgroundColor:"#FFFF12",
    borderColor:"#FFFFAA",
    text:"Last node."
  }
]

const edges:GEdge[] = [
  {
    id:1,
    type:"default",
    from:1,
    to:2
  },
  {
    id:1,
    type:"default",
    from:1,
    to:3
  },
  {
    id:1,
    type:"default",
    from:3,
    to:4
  },
]

function App() {
  return (
    <div className="App">
     <GraphView nodes={nodes} edges={edges}></GraphView>
    </div>
  );
}

export default App;

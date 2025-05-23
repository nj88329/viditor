import './App.css';
import Screen from './screen';

import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Screen/>
      </DndProvider>
    </>
  )
}

export default App

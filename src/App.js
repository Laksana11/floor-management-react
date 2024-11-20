
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import { Basket } from './components/Basket';
import Layout from './layout/Layout';


function App() {
  return (
    <Layout/>
    // <DndProvider backend={HTML5Backend}>
    //   <Basket />
    // </DndProvider>
    
   
  );
}

export default App;

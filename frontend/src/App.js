import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react';
import {getAllTasks} from './service/tasks.service';

function App() {
  useEffect(() => {
   console.log(getAllTasks())
  }, [])
  
  return (
    <div className="App">
    </div>
  );
}

export default App;

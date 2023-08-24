import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Screen/Home';
import StudentData from './Screen/Student/StudentData';
import SubjectData from './Screen/Subject/SubjectData';
import Result from './Screen/Result/Result';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/result/:id' element={<Result/>}/>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;

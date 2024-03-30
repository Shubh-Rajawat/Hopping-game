import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Jump from './components/Jump';
import Flight from './components/Flight';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Jump /> } />
        <Route path='/savetheflight' element={ <Flight /> } />
      </Routes>

    </BrowserRouter>
  );
}


export default App;

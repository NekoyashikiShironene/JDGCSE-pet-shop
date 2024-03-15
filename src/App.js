import React, {useEffect} from 'react';
import './styles/App.css';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';


function App() {

  useEffect(() => {
    console.log('App component rendered');
  });

  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          
        </Router>

      </div>
  );
}

export default App;

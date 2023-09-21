import './App.css';
import Authentication from './components/Authentication/Authentication';
import { Route , Routes } from 'react-router-dom';
import Root from './components/Root/Root';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Root/>}>
          <Route index element={<Authentication/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

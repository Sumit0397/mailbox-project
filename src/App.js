import './App.css';
import Authentication from './components/Authentication/Authentication';
import { Route, Routes } from 'react-router-dom';
import Root from './components/Root/Root';
import Root2 from './components/Root/Root2';
import Compose from './components/Profile/Compose';
import Inbox from './components/Profile/Inbox';
import Profile from './components/Profile/Profile';
import SentBox from './components/Profile/SentBox';
import EmailMessage from './components/Profile/EmailMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { inboxItemFill } from './store/inboxSlice';
import { sentboxItemFill } from './store/sentboxSlice';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      dispatch(inboxItemFill(localStorage.getItem("userEmail")))
      dispatch(sentboxItemFill(localStorage.getItem("userEmail")))
    }
  }, [])

  setInterval(() => {
    if (localStorage.getItem('userEmail')) {
      dispatch(inboxItemFill(localStorage.getItem('userEmail')))
      dispatch(sentboxItemFill(localStorage.getItem('userEmail')))
      console.log('render');
    }
  }, 2000)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<Authentication />} />
          <Route path='/profile' element={<Root2 />}>
            <Route index element={<Profile />} />
            <Route path='/profile/compose' element={<Compose />} />
            <Route path='/profile/inbox' element={<Inbox />} />
            <Route path='/profile/sentbox' element={<SentBox />} />
            <Route path='/profile/sentbox/message' element={<EmailMessage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

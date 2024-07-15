import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import Userlogin from './Component/Userlogin';
import Verticlenav from './Component/Verticlenav';
import Video from './Component/Video'
import Userregister from './Component/Userregister';
import Community from './Component/Community';
import CurrentUser from './Component/CurrentUser';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
    <Verticlenav/>
    <Routes>
      <Route path="/community" exact element={<Community/>} />
      <Route path="/current-user" exact element={<CurrentUser/>} />
      <Route path="/video" exact element={<Video/>} />
      <Route path="/login" exact element={<Userlogin/>} />
      <Route path="/signup" exact element={<Userregister/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;

import './App.css';
import Navbar from './Component/constant/Navbar';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import Userlogin from './Component/constant/Userlogin';
import Verticlenav from './Component/constant/Verticlenav';
import Video from './Component/constant/Video'
import Userregister from './Component/constant/Userregister';
import Community from './Component/Community';
import CurrentUser from './Component/User/CurrentUser';
import ChangePass from './Component/User/ChangePass';
import Setting from './Component/User/Setting';
import Footer from './Component/constant/Footer';
import EditDetails from './Component/User/EditDetails';
import GetChannel from './Component/User/GetChannel';
import GetVideoById from './Component/video/GetVideoById';
import PublishVideo from './Component/video/PublishVideo';

function App() {
  return (
    <>
    <Router>
    <Navbar/>
    <div>
      <Verticlenav/>
    <Routes>
      <Route path="/community" exact element={<Community/>} />
      <Route path="/current-user" exact element={<CurrentUser/>} />
      <Route path="/" exact element={<Video/>} />
      <Route path="/login" exact element={<Userlogin/>} />
      <Route path="/signup" exact element={<Userregister/>} />
      <Route path="/reset-pass" exact element={<ChangePass/>} />
      <Route path='/edit-detail' exact element={<EditDetails/>}/>
      <Route path="/setting" exact element={<Setting/>} />
      <Route path="/channel/:username" exact element={<GetChannel/>} />
      {/* videos */}
      <Route path="/video/:id" exact element={<GetVideoById/>} />
      <Route path="/video/publish-video" exact element={<PublishVideo/>} />
    </Routes>
    </div>
    <Footer/>
    </Router>
    </>
  );
}

export default App;

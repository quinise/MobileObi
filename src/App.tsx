// This file includes the App's routes and provides the navigation across each page
import './css/App.css'
import { auth } from "./../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from './components/Auth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {Link , Route, Routes} from "react-router-dom";
import Logout from './components/Logout';
import CastList from './components/CastList.tsx';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (error) {
    console.log("useAuthState Error: " + error);
    return (
      // Navbar with useAuthState error
      <div className='container'>
        <div className='mt-5 mb-7 relative'>
          <Link to="/"><p className='ml-10 mr-10 inline'>Home</p></Link>
          <Link to="/dashboard"><p className='ml-10 mr-10 inline'>Dashboard</p></Link>
        </div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={
              <Auth>
                <Dashboard/>
              </Auth>
            }/>
            <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
  )}

  if (user) {
    return (
      // Navbar with a valid user, includes logout
      <div className='container'>
        <div className='mt-5 mb-7 relative'>
          <Link to="/dashboard"><p className='ml-10 mr-10 inline'>Dashboard</p></Link>
          <Link to="/castList"><p className='ml-10 mr-10 inline'>Saved Casts</p></Link>

          <Link to="/logout"><p className='ml-10 absolute top-0 right-0 inline'>Logout</p></Link>
        </div>
        <Routes>
            <Route path="/dashboard" element={
              <Auth>
                <Dashboard/>
              </Auth>
            }/>
            <Route path="/castList" element={
              <Auth>
                <CastList/>
              </Auth>
            }/>
            <Route path="/logout" element={
              <Auth>
                <Logout/>
              </Auth>
            }/>
        </Routes>
      </div>
    );
  } else {
    // Navbar with link to Login
    return (
      <div className='container'>
        <div className='mt-5 mb-7 relative'>
        </div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    )
  }
}

export default App

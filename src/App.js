import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardNavigation } from './Features/DashboardNavigation';
import { SignUp } from './Components/Sign-Up';
import { Home } from './Components/Home';
import { AdminPanel } from './Features/AdminPanel';

function App() {
  const Error = ()=>(
    <div className='pageError' style={{height: '49vw', backgroundColor: 'lightblue', width: "100vw", display:'flex', alignItems:'center', justifyContent: 'center'}}>
      <p style={{fontSize: 20}}>The page you requested doesn't exist</p>
    </div>
  )

  return (
    <Router>
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/dashboard' element={<DashboardNavigation />} />
        <Route path='/ngatia/richie' element={<AdminPanel />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

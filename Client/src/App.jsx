
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RootLayouts from './layouts/RootLayouts';
import LearnerLayout from './layouts/LearnerLayout';
import About from './pages/About'
import Jobs from './pages/Jobs'
import Contact from './pages/Contact'
import Register from './pages/learner/Register'
import LearnerDashboard from './pages/learner/LearnerDashboard'
import Login from './pages/Login';
import ProtectedRoot from './layouts/ProtectedRoot';
import Profile from './pages/learner/Profile';
import Courses from './pages/learner/Courses';
import CourseDetails from './pages/learner/CourseDetails'


function App() {
   
  return (
<Routes>
   
        <Route path="/" element={<RootLayouts />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/learner/register" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Route>

      {/***************Learner Layout*********************/}
    <Route>
      <Route path="/learner" element={<LearnerLayout/>}>
      <Route index element={<LearnerDashboard/>}/>

         <Route element={<ProtectedRoot/>}>
            <Route path="profile" element={<Profile/>}></Route>
         </Route>

      <Route path="courses" element={<Courses/>}/>
       <Route path="courses/:id" element={<CourseDetails />} />  
      </Route>
    </Route>
 

       
  </Routes>

    
   
  )
}

export default App

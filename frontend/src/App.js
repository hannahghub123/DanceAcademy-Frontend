import './App.css';
import Home from './components/home/Home';
import OptionSignup from './components/signup/OptionSignup';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import StdSignup from './components/stdSignup/StdSignup';
import TutorSignup from './components/tutorSignup/TutorSignup';
import StdLogin from './components/stdLogin/StdLogin';
import TutorLogin from './components/tutorLogin/TutorLogin';
import StudentDashboard from './components/dashboard/StudentDashboard';
import OptLogin from './components/login/OptLogin';
import AdminLogin from './components/admin/login/AdminLogin';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import StudentComponent from './components/admin/dashboard/student/StudentComponent';
import TutorsComponent from './components/admin/dashboard/tutor/TutorsComponent';
import TutorProfile from './components/tutorprofile/TutorProfile';
import Course from './components/admin/dashboard/course/Course';
import CourseStruct from './components/admin/dashboard/course/CourseStruct';
import Header from './components/common/header/Header';
import About from './components/about/About';
import CourseHome from './components/allcourses/CourseHome';
import Contact from './components/contact/Contact';
import Footer from './components/common/footer/Footer';
import StdProfile from './components/stdprofile/StdProfile';
import CourseDetails from './components/allcourses/CourseDetails';
import RelatedVideos from './components/allcourses/RelatedVideos';
import StudentMyNotes from './components/mynotes/StudentMyNotes';
import Zegocloud from './components/zegocloud/Zegocloud';
import { ToastContainer } from 'react-toastify'; 
import TaskUpload from './components/stdprofile/task/TaskUpload';
import CoursesPurchased from './components/dashboard/studentdetails/CoursesPurchased';
import ZegoChat from './components/zegocloud/ZegoChat';
import CompletedActivities from './components/dashboard/studentdetails/CompletedActivities';
import PendingActivities from './components/dashboard/studentdetails/PendingActivities';
import TutorDashboard from './components/dashboard/TutorDashboard';
import VideoList from './components/cloudinary/video/VideoList';
import StudentList from './components/dashboard/tutordetails/StudentList';
import TaskAssigned from './components/dashboard/tutordetails/session/TaskAssigned';
import StudentUploads from './components/dashboard/tutordetails/StudentUploads';
import ScoresFeedbacks from './components/dashboard/tutordetails/feedback/ScoresFeedbacks';
import FeedbackDetails from './components/dashboard/studentdetails/FeedbackDetails';
import TutorUploads from './components/admin/dashboard/tutor/TutorUploads';
import TasksAssigned from './components/admin/dashboard/tutor/TasksAssigned';
import FeedbacksGiven from './components/admin/dashboard/tutor/FeedbacksGiven';
import MyUploads from './components/dashboard/studentdetails/MyUploads';

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
 
  return (
    <>
    <BrowserRouter>
    <div className="App">
    {!isAdminRoute && <Header />}
    {/* {isAdminRoute ? <AdminHeader /> : <MainHeader />} */}
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/courses" element={<CourseHome/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="opt-login/" element={<OptLogin/>} />
      <Route path="opt-signup/" element={<OptionSignup/>} />
      <Route path="std-signup/" element={<StdSignup/>} />
      <Route path="tutor-signup/" element={<TutorSignup/>} />
      <Route path="std-login/" element={<StdLogin/>} />
      <Route path="tutor-login/" element={<TutorLogin/>} />
      <Route path="tutor-dashboard/:id" element={<TutorDashboard/>} />
      <Route path="std-dashboard/" element={<StudentDashboard/>} />
      <Route path="tutor-profile/:id" element={<TutorProfile/>} />
      <Route path="Std-MyNotes/:id" element={<StudentMyNotes/>} />
      <Route path="Tutor-MyNotes/:id" element={<StudentMyNotes/>} />
      <Route path="std-profile/:id" element={<StdProfile/>} />
      <Route path='course-details/:id' element={<CourseDetails/>}/>
      <Route path="tutor-videos/" element={<RelatedVideos/>}/>
      <Route path="zego/" element={<Zegocloud/>} /> 
      <Route path="zegoChat/" element={<ZegoChat/>} />
      <Route path="task-upload/:id" element={<TaskUpload/>} />
      <Route path="course-purchased/" element={<CoursesPurchased/>} />
      <Route path="completed-activities/" element={<CompletedActivities/>} />
      <Route path="pending-activities/" element={<PendingActivities/>} />
      <Route path="students-assigned/" element={<StudentList/>} />
      <Route path="students-uploads/" element={<StudentUploads/>} />
      <Route path="my-uploads/" element={<VideoList/>} />
      <Route path="tasks-assigned/" element={<TaskAssigned/>} />
      <Route path="scores-feedbacks/" element={<ScoresFeedbacks/>} />
      <Route path="feedback-details/" element={<FeedbackDetails/>} />
      <Route path="student-my-uploads/" element={<MyUploads/>} />
      </Routes>
      {!isAdminRoute && <Footer />}

      <Routes>
      <Route path="/admin/adminlogin/" element={<AdminLogin/>} />
      <Route path="/admin/admin-dashboard/" element={<AdminDashboard/>} />
      <Route path="/admin/student/" element={<StudentComponent/>} />
      <Route path="/admin/tutor/" element={<TutorsComponent/>} />   
      <Route path="/admin/courses/" element={<Course/>} />
      <Route path="/admin/course-struct/:id" element={<CourseStruct/>} />
      <Route path="/admin/tutor-uploads/" element={<TutorUploads/>} />
      <Route path="/admin/student-uploads/" element={<StudentUploads/>} />
      <Route path="/admin/tasks-assigned/" element={<TasksAssigned/>} />
      <Route path="/admin/feedbacks-given/" element={<FeedbacksGiven/>} />
  
      </Routes>
      {/* {!isAdminRoute && <Footer />} */}
      {/*        {isAdminRoute ? <AdminFooter /> : <MainFooter />} */}
    </div>
    <ToastContainer />
    </BrowserRouter>


    </>
  );
}

export default App;

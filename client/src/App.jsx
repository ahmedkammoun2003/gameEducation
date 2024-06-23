import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Sign-in" element={<SignIn/>}/>
        <Route path="/Sign-up" element={<SignUp/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="*" element={<h1>404</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}
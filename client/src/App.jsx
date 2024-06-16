import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import SignIn from './pages/SignIn.jsx';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Sign-in" element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  )
}
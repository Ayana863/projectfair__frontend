
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ProjectsView from './pages/ProjectsView'
import Footer from './components/Footer'
import Header from './components/Header'



function App() {
  

  return (
    <>
    <Header/>
     <Routes>
      <Route element={<Home/>}path='/'/>
      <Route element={<Auth insideregister={true} />}path='/register'/>
      <Route element={<Auth/>}path='/login'/>
      <Route element={<Dashboard/>}path='/dashboard'/>
      <Route element={<ProjectsView/>}path='/projects'/>
     </Routes>

<Footer/>
       
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { Link } from 'react-router-dom'

<Link
  to="/signin"
  className="text-sm font-semibold leading-6 text-white hover:text-indigo-400"
>
  Log in <span aria-hidden="true">&rarr;</span>
</Link>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App

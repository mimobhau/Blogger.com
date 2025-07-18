import './App.css';
import Post from "./Components/Post"
import Header from "./Components/Header"
import Layout from "./Components/Layout"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { UserContextProvider } from './Components/UserContext';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <UserContextProvider>
      {/* // if you have <BrowserRouter></BrowserRouter> in 'index.js' file, we don't need to add <Router></Router> in the 'app.js' file */}
          <Routes>
            <Route path="/" element={ <Layout /> }>
            {/* "Parent element" encloses other components so that the "header" component need not to be repeated for every page */}
              <Route index element ={ <IndexPage /> } />
              <Route path="/login" element={ <LoginPage /> } />
              <Route path="/register" element={ <RegisterPage /> } />
              <Route path="/create" element={<CreatePost />} />
            </Route>
            {/* Closing tag of Parent component */}
          </Routes>
    </UserContextProvider>
  
  );
}

export default App;
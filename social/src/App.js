import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./Main";
import CardInfo from "./components/CardInfo/CardInfo";
import Login from './components/Login/Login';
import { ToastContainer } from "react-toastify";
import NewPost from './components/NewPost/NewPost';
import SinglePost from './components/SinglePost/SinglePost';
import PrivateRoute from './components/PrivateRoute';
import UpdatePost from './components/Card/UpdatePost';


function App() {
  return (
    <Router>
      <div className="App">
      <ToastContainer autoClose={1500} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cardInfo" element={<CardInfo />} />
            <Route path='/post' element={<NewPost/>}/>
            <Route path='/post/:id' element={<SinglePost/>}/>
            <Route path='/edit/:id' element={<UpdatePost/>}/>
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

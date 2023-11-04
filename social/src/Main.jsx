import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";
import Home from "./components/HOme/Home";
import Navbar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";

const Main = () => {
  return (
    <div className="App">
    <Navbar/>
    <Home/>
    <Posts/>
    {/* <Card/> */}
    <Footer/>
  </div>
  )
}

export default Main
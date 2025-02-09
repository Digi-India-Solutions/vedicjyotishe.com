import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homemain from './Components/Homemain/Homemain';
import Footer from './Components/Footer/Footer';
import About from './Pages/AboutPage/About';
import Kundali from './Pages/Kundalipage/Kundali';
import Question from './Pages/Question/Question';
import Contact from './Pages/ContactUs/Contact';
import Blog from './Pages/Blog/Blog';
import Blogdes from './Pages/BlogDes/Blogdes';
import OurServices from './Pages/OurServices/OurServices';
import GetAddress from './Pages/Kundalipage/GetAddress';
import Socialfeed from './Pages/SocialFeed/Socialfeed';
import SuccessPage from './Pages/SuccessPage/SuccessPage';

function App() {
  return (
  <>
<BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Homemain />} />
        <Route path="/About" element={<About />} />
        <Route path="/Service-Details/:name" element={<Kundali />} />
        <Route path="/Question" element={<Question />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/blog-details/:id" element={<Blogdes />} />
        <Route path="/OurServices" element={<OurServices />} />
        <Route path="/GetAddress" element={<GetAddress />} />
        <Route path="/Socialfeed" element={<Socialfeed />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    <Footer />
  </BrowserRouter>
  <script>
  AOS.init();
</script>
  </>
  );
}

export default App;

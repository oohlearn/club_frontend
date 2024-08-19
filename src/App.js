import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import FrontLayout from "./pages/FontLayout";
import IntroPage from "./pages/Intro/Intro";
import Activities from "./pages/Activities/ActivitiesPage";
import ActivityTicket from "./pages/Activities/ActivityTicket";
import IntroHome from "./pages/Intro/IntroHome";
import ExperiencesPage from "./pages/Intro/Experiences";
import Conductors from "./pages/Intro/Conductors";
import Teachers from "./pages/Intro/Teachers";
import Videos from "./pages/Videos/VideosPage";
import Albums from "./pages/Albums/AlbumsPage";
import AlbumDetail from "./pages/Albums/AlbumDetail";
import News from "./pages/News/News";
import NewsDetail from "./pages/News/NewsDetail";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop/ShopPage";
import ChooseSeats from "./pages/Order/ChooseSeats";
import Checkout from "./pages/Shop/Checkout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="intro" element={<IntroPage />}>
            <Route path="" element={<IntroHome />}></Route>
            <Route path="experiences" element={<ExperiencesPage />}></Route>
            <Route path="conductors" element={<Conductors />}></Route>
            <Route path="teachers" element={<Teachers />}></Route>
          </Route>
          <Route path="activities" element={<Activities />}></Route>
          <Route path="activities/:activityId" element={<ActivityTicket />}></Route>
          <Route path="activities/:activityId/choose_seats" element={<ChooseSeats />}></Route>
          <Route path="videos" element={<Videos />}></Route>
          <Route path="albums" element={<Albums />}></Route>
          <Route path="albums/:albumId" element={<AlbumDetail />}></Route>
          <Route path="news" element={<News />}></Route>
          <Route path="news/:newsId" element={<NewsDetail />}></Route>
          {/* Navbar */}
          <Route path="contact" element={<Contact />}></Route>
          <Route path="shop" element={<Shop />}></Route>
          <Route path="shop/checkout" element={<Checkout />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

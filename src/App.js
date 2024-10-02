import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import FrontLayout from "./pages/FontLayout";
import IntroPage from "./pages/Intro/Intro";
import Activities from "./pages/Activities/ActivitiesPage";
import ActivityDetail from "./pages/Activities/ActivityDetail";
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
import Checkout from "./pages/Order/Checkout";
import ProductDetail from "./pages/Shop/ProductDetail";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import UserLogin from "./pages/Users/UserLogin";
import UserRegister from "./pages/Users/UserRegister";
import { ProductCartProvider } from "./context/ProductCartContext";
import TicketCartDrawer from "./pages/Activities/TicketCartDrawer";
import { TicketCartProvider } from "./context/TicketCartContext";
import { ProductsProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import UserDashBoard from "./pages/Users/UserDashboard";
import UserLogout from "./pages/Users/UserLogout";
import { ThirdStep } from "./pages/Order/ThirdStep";
import { CartProvider } from "./context/CartContext";
import { TimerProvider } from "./context/TimerContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <div className="App">
      <TicketCartProvider>
        <TimerProvider>
          <AuthProvider>
            <ProductProvider>
              <ProductCartProvider>
                <CartProvider>
                  <Routes>
                    <Route path="/" element={<FrontLayout />}>
                      <Route path="" element={<Home />}></Route>
                      <Route path="user/login" element={<UserLogin />}></Route>
                      <Route path="user/register" element={<UserRegister />}></Route>
                      <Route path="user/dashboard" element={<UserDashBoard />}></Route>
                      <Route path="user/logout" element={<UserLogout />}></Route>

                      <Route path="intro" element={<IntroPage />}>
                        <Route path="" element={<IntroHome />}></Route>
                        <Route path="experiences" element={<ExperiencesPage />}></Route>
                        <Route path="conductors" element={<Conductors />}></Route>
                        <Route path="teachers" element={<Teachers />}></Route>
                      </Route>

                      <Route path="videos" element={<Videos />}></Route>
                      <Route path="albums" element={<Albums />}></Route>
                      <Route path="albums/:albumId" element={<AlbumDetail />}></Route>
                      <Route path="news" element={<News />}></Route>
                      <Route path="news/:newsId" element={<NewsDetail />}></Route>
                      <Route path="contact" element={<Contact />}></Route>

                      <Route path="activities" element={<Activities />}></Route>
                      <Route path="activities/:eventId" element={<ActivityDetail />}></Route>
                      <Route
                        path="activities/:eventId/choose_seats/:price"
                        element={<ChooseSeats />}
                      ></Route>
                      <Route path="shop" element={<Shop />}></Route>
                      <Route path="shop/:productId" element={<ProductDetail />}></Route>
                      <Route path="shop/checkout" element={<Checkout />}></Route>
                      <Route path="shop/payment" element={<ThirdStep />} />

                      {/* admin */}
                      <Route path="admin-login" element={<AdminLogin />}></Route>
                      <Route path="admin-register" element={<AdminRegister />}></Route>
                    </Route>
                  </Routes>
                </CartProvider>
              </ProductCartProvider>
            </ProductProvider>
          </AuthProvider>
        </TimerProvider>
      </TicketCartProvider>
    </div>
  );
}

export default App;

import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Category from "./components/category/Category";
import CategoryList from "./components/category-list/CategoryList";
import ProductList from "./components/product-list/ProductList";
import AdminPage from "./pages/admin/AdminPage";
import AdminProductCreate from "./pages/admin/AdminProductCreate";
// bugfix

const Home = () => <div>
  <Hero />
  <Category />
  <CategoryList />
  <ProductList />
</div>;
const About = () => <div>Страница О нас</div>;
const Contact = () => <div>Наши контакты</div>;
const Blog = () => <div>Наш блог</div>;

const Layout = () => {
  return(
    <>
          <Header />
          <Outlet />
    </>
  )
}

const App = () => {
  return (
    <div>
  
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

        </Route>

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add-product" element={<AdminProductCreate />} />
      </Routes>
    </div>
  );

  
};

export default App;
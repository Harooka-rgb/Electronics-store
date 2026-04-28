import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Category from "./components/category/Category";
import CategoryList from "./components/category-list/CategoryList";
import ProductList from "./components/product-list/ProductList";
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

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );

  
};

export default App;
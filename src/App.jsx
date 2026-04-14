import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
// bugfix

const Home = () => <div>
  <Hero />
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
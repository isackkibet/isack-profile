import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import Contact from '../components/sections/Contact';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Contact />
    </div>
  );
};

export default Home;

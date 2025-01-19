import Hero from '../components/Hero';
import Features from '../components/Features';
import NewsLetter from '../components/NewsLetter';
import PopularProduct from '../components/PopularProduct';
import Banner from '../components/Banner';
import About from '../components/About';
import Blog from '../components/Blog';
import NewArrivals from '../components/NewArrivals';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
        <Hero/>
        <Features/>
        <NewArrivals/>
        <PopularProduct/>
        <Banner/>
        <About/>
        <Blog/>
        <NewsLetter/>
        <Footer/>
        </>
    );
};

export default Home;
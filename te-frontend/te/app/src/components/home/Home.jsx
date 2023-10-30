import Hero from "./Hero"
import Members from "./Members";

const Home = () => {

    localStorage.setItem('prevPage', "/");

    return (
        <>
            <Hero />
            <Members />
        </>
    )
}

export default Home;
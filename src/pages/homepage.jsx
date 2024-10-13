import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Home Page</h1>
            <Link to="/basicquestions">Basic Questions</Link>
            <Link to="/detailedquestions">Detailed Questions</Link>
        </>
    );
};

export default Home;
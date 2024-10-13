import { Link } from "react-router-dom";

const DetailedQuestions = () => {
    return (
        <div>
            <h1>Detailed Questions Page</h1>
            <Link to="/basicquestions">Basic Questions</Link>
            <Link to="/">Home Page</Link>
        </div>
    );
};

export default DetailedQuestions;

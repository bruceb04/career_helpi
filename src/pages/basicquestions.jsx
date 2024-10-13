import React from "react";
import { Link } from "react-router-dom";

const BasicQuestions = () => {
    return (
        <div>
            <h1>Basic Questions Page</h1>
            <Link to="/detailedquestions">Detailed Questions</Link>
            <Link to="/">Home Page</Link>
        </div>
    );
};

export default BasicQuestions;

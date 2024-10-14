import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    const quizzes = [
        {
            title: "Basic Quiz",
            desc: "A very quick and easy quiz to find out your potential careers. These relatively simple questions will give a brief overview of the types of careers you might want to look further into.",
            button: "Basic",
            route: "/basicquestions"
        },
        {
            title: "Detailed Quiz",
            desc: "A more detailed questionnaire to give a more in-depth career result and pinpoint your future careers more.",
            button: "Detailed",
            route: "/detailedquestions"
        }
    ];

    const currentDate = new Date().toLocaleDateString(); // Get current date

    const renderQuiz = (quiz) => (
        <div key={quiz.title}>
            <h2>{quiz.title}</h2>
            <p>{quiz.desc}</p>
            <Link to={quiz.route}>
                <button>{quiz.button}</button>
            </Link>
        </div>
    );

    return (
        <>
            <header>
                <h1>Career Quiz</h1>
                <p>Date: {currentDate}</p>
            </header>
            {quizzes.map(renderQuiz)}
        </>
    );
}

export default Home;

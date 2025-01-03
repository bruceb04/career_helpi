import React from 'react';
import { Link } from 'react-router-dom';
import './CSSFolder/homepage.css';

const Home = ({ changeKey, handleSubmit }: { changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void; handleSubmit: () => void }) => {
    const quizzes = [
        {
            title: "Basic Quiz",
            desc: "A very quick and easy quiz to find out your potential careers. These yes or no questions will give a brief overview of the types of careers you might want to look further into.",
            button: "Basic",
            route: "/basicquestions"
        },
        {
            title: "Detailed Quiz",
            desc: "A more detailed questionnaire in which the user will give answers ranging from 1 to 5 on agreeance to each statement. This quiz is designed to give a more in-depth career result and pinpoint your potential future careers.",
            button: "Detailed",
            route: "/detailedquestions"
        }
    ];

    const currentDate = new Date().toLocaleDateString();

    const renderQuiz = (quiz: { title: string; desc: string; button: string; route: string }) => (
        <div key={quiz.title} className="quiz-card">
            <h2>{quiz.title}</h2>
            <p>{quiz.desc}</p>
            <Link to={quiz.route} className="quiz-button">{quiz.button}</Link>
        </div>
    );

    return (
        <div>
            <header>
                <h1>Career Helper</h1>
            </header>
            <main>
                <p>Today's date: {currentDate}</p>
                <div className="quiz-container">
                    {quizzes.map(renderQuiz)}
                </div>
                <form onSubmit={handleSubmit}>
                    <div>API Key:</div>
                    <input type="text" onChange={changeKey} placeholder="Enter your key" />
                    <button type="submit">Submit</button>
                </form>
            </main>
            <footer>
                <p>&copy; {new Date().getFullYear()} Career Helper. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
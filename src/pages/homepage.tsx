import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Home = ({ changeKey, handleSubmit }: { changeKey: (event: React.ChangeEvent<HTMLInputElement>) => void; handleSubmit: () => void }) => {
    const [userData, setUserData] = useState({ name: "", email: "" });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFormSubmit = () => {
        const jsonData = JSON.stringify(userData);
        // Save jsonData to a file or send it to the API
        console.log(jsonData);
        handleSubmit();
    };

    const quizzes = [
        {
            title: "Basic Quiz",
            desc: "A very quick and easy quiz to find out your potential careers. These relatively simple questions will give a brief overview of the types of careers you might want to look further into.",
            button: "Basic",
            route: "/basicquestions"
        },
        {
            title: "Detailed Quiz",
            desc: "A more detailed questionnaire to give a more in-depth career result and pinpoint your potential future careers.",
            button: "Detailed",
            route: "/detailedquestions"
        }
    ];

    const currentDate = new Date().toLocaleDateString();

    const renderQuiz = (quiz: { title: string; desc: string; button: string; route: string }) => (
        <div key={quiz.title}>
            <h2>{quiz.title}</h2>
            <p>{quiz.desc}</p>
            <Link to={quiz.route}>
                <button>{quiz.button}</button>
            </Link>
        </div>
    );

    return (
        <div>
            <header>
                <h1>Career Helpi</h1>
            </header>
            <main>
                <h2>Welcome to Career Helpi</h2>
                <p>Today's date: {currentDate}</p>
<form onSubmit={handleFormSubmit} className="user-form">
    <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
        />
    </div>
    <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
        />
    </div>
    <button type="submit" className="submit-button">Submit</button>
</form>
<div className="quiz-container">
    {quizzes.map(renderQuiz)}
</div>
</main>
<footer>
    <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
    </Form>
    <p>&copy; {new Date().getFullYear()} Career Helpi. All rights reserved.</p>
</footer>
</div>
);
};

export default Home;
import React, { useState } from 'react';

const BasicQuestions = () => {
    const questions = [
        "Do you enjoy working with numbers?",
        "Are you comfortable with public speaking?",
        "Do you like working in a team?",
        "Do you enjoy solving complex problems?",
        "Are you interested in technology?",
        "Do you prefer a structured work environment?",
        "Do you enjoy creative tasks?"
    ];

    const [responses, setResponses] = useState(Array(questions.length).fill(null));
    const [completion, setCompletion] = useState(0);

    const handleResponse = (index, response) => {
        const newResponses = [...responses];
        newResponses[index] = response;
        setResponses(newResponses);

        const answeredCount = newResponses.filter(r => r !== null).length;
        setCompletion(Number(((answeredCount / questions.length) * 100).toFixed(2)));
    };

    return (
        <div>
            <h1 id="header">Basic Questions</h1>
            <p>You can change your answers at any time.</p>
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question}</p>
                    <button onClick={() => handleResponse(index, "Yes")}>Yes</button>
                    <button onClick={() => handleResponse(index, "No")}>No</button>
                    {responses[index] && <p>Your answer: {responses[index]}</p>}
                </div>
            ))}
            <div>
                <p>Completion: {completion}%</p>
                <progress value={completion} max="100"></progress>
                {completion === 100 && <p>Congratulations! You've completed all the questions.</p>}
            </div>
        </div>
    );
};

export default BasicQuestions;
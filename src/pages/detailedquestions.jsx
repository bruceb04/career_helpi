import React, { useState } from 'react';

const DetailedQuestions = () => {
    const questions = [
        "I enjoy learning new things and expanding my skills regularly.",
        "I am passionate about specific subjects or topics from my school days.",
        "I prefer working independently rather than collaborating with others.",
        "I find creative tasks (like writing or designing) enjoyable.",
        "I believe I am well-organized and manage my tasks efficiently.",
        "Achieving a good work-life balance is important to me.",
        "I value job stability over the potential for high earnings.",
        "A high salary is one of my top priorities in choosing a career.",
        "I am comfortable speaking in front of large groups.",
        "I would prefer a job that allows remote work options.",
        "I am open to further education or training for my career.",
        "I gain satisfaction from helping others and being in service roles.",
        "I am more interested in analyzing data than interacting with people.",
        "I handle stressful situations and pressure effectively.",
        "I am curious about specific industries or fields.",
        "I am willing to relocate or travel frequently for work.",
        "Job title and status are important factors for me in a career.",
        "I enjoy having a routine and structured tasks each day.",
        "I value having opportunities for career advancement.",
        "I want my work to positively impact society or the environment."
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
            <h1 id="header">Detailed Career Quiz</h1>
            <p>You can change your answers at any time.</p>
            <p>Please answer on a scale of 1 to 5.</p>
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question}</p>
                    <button onClick={() => handleResponse(index, "1")}>1</button>
                    <button onClick={() => handleResponse(index, "2")}>2</button>
                    <button onClick={() => handleResponse(index, "3")}>3</button>
                    <button onClick={() => handleResponse(index, "4")}>4</button>
                    <button onClick={() => handleResponse(index, "5")}>5</button>
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

export default DetailedQuestions;
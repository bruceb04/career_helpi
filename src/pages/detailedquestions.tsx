import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './detailedquestions.css';

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

const DetailedQuestions = ({ setDetailedData }: { setDetailedData: (data: any) => void }) => {
    const [responses, setResponses] = useState<(string | null)[]>(Array(questions.length).fill(null));
    const navigate = useNavigate();

    const handleResponse = (index: number, response: string): void => {
        const newResponses = [...responses];
        newResponses[index] = response;
        setResponses(newResponses);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setDetailedData(responses);
        navigate('/result');
    };

    return (
        <div className="detailed-questions-page">
            <div className="container">
                <h1 id="header">Detailed Questions</h1>
                <p>You can change your answers at any time.</p>
                {questions.map((question, index) => (
                    <div key={index} className="form-group">
                        <p>{question}</p>
                        <button onClick={() => handleResponse(index, "Yes")}>Yes</button>
                        <button onClick={() => handleResponse(index, "No")}>No</button>
                        {responses[index] && <p>Your answer: {responses[index]}</p>}
                    </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default DetailedQuestions;
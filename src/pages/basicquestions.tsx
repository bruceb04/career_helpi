import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './basicquestions.css';

const questions = [
"Do you enjoy working with numbers?",
"Are you comfortable with public speaking?",
"Do you like working in a team?",
"Do you enjoy solving complex problems?",
"Are you interested in technology?",
"Do you prefer a structured work environment?",
"Do you enjoy creative tasks?"
];

const BasicQuestions = ({ setBasicData }: { setBasicData: (data: any) => void }) => {
    const [responses, setResponses] = useState<(string | null)[]>(Array(questions.length).fill(null));
    const navigate = useNavigate();

    const handleResponse = (index: number, response: string): void => {
        const newResponses = [...responses];
        newResponses[index] = response;
        setResponses(newResponses);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBasicData(responses);
        navigate('/detailedquestions');
    };

    return (
        <div className="basic-questions-page">
            <div className="container">
                <h1 id="header">Basic Questions</h1>
                <p>You can change your answers at any time.</p>
                {questions.map((question, index) => (
                    <div key={index} className="form-group">
                        <p>{question}</p>
                        <button onClick={() => handleResponse(index, "Yes")}>Yes</button>
                        <button onClick={() => handleResponse(index, "No")}>No</button>
                        {responses[index] && <p>Your answer: {responses[index]}</p>}
                    </div>
                ))}
                <button onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default BasicQuestions;

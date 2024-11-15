import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CSSFolder/basicquestions.css';

type Props = {basicQuestionsData: {question: string, answered: boolean, isMatch: boolean}[], onSubmit: () => {}}

export default function BasicQuestions({basicQuestionsData, onSubmit}: Props) {

    const navigate = useNavigate();

    const [completion, setCompletion] = useState<number>(0);
    const [basicQuestions, setBasicQuestions] = useState(basicQuestionsData)

    const handleResponse = (index: number, response: string): void => {
        // update json data
        const bqRef = [...basicQuestions];
        bqRef[index] = {question: basicQuestionsData[index].question, answered: true, isMatch: (response === "Yes") ? true : false};
        setBasicQuestions(bqRef);

        basicQuestionsData = bqRef

        // update answered count state
        const countRef = [...bqRef];
        let answeredQuestions = countRef.filter((item) => item.answered)

        setCompletion(Number(((answeredQuestions.length / bqRef.length) * 100).toFixed(2)));
    };

    return (
        <div className='container'>
            <h1 id="header" className='h1'>Basic Questions</h1>
            <p>You can change your answers at any time.</p>
            <div>
                <p>Completion: {completion}%</p>
                <progress value={completion} max="100"></progress>
                {completion === 100 && <p>Congratulations! You've completed all the questions.</p>}
            </div>
            {basicQuestions.map((q, index) => (
                <div className='form-group' key={index}>
                    <p>{q.question}</p>
                    {["Yes", "No"].map((response) => (
                        <button className="button" onClick={() => handleResponse(index, response)}>{response}</button>
                    ))}
                    {basicQuestions[index].answered && <p>Your answer: {basicQuestions[index].isMatch ? "Yes" : "No"}</p>}
                </div>
            ))}
            <div>
                <p>Completion: {completion}%</p>
                <progress value={completion} max="100"></progress>
                {completion === 100 && <p>Congratulations! You've completed all the questions.</p>}
            </div>
            <Button disabled={completion !== 100.00} onClick={() => {onSubmit(); navigate("/results")}}>Submit</Button>
        </div>
    );
};
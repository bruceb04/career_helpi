import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './detailedquestions.css';

type Props = {detailedQuestionsData: {question: string, answered: boolean, match: number}[], onSubmit: () => {}}

export default function DetailedQuestions({detailedQuestionsData, onSubmit}: Props){

    const navigate = useNavigate();

    // Type: responses is an array of strings or nulls
    const [completion, setCompletion] = useState<number>(0);
    const [detailedQuestions, setDetailedQuestions] = useState(detailedQuestionsData);

    const handleResponse = (index: number, response: string): void => {

        // update detailedQuestionData json
        const dqRef = [...detailedQuestions]
        dqRef[index] = {question: detailedQuestionsData[index].question, answered: true, match: Number(response)}
        setDetailedQuestions(dqRef);

        detailedQuestionsData = dqRef;
        
        const countRef = [...dqRef];
        
        let answeredQuestions = countRef.filter((item) => item.answered)

        setCompletion(Number(((answeredQuestions.length / dqRef.length) * 100).toFixed(2)));
    };

    return (
        <div className='container'>
            <h1 id="header" className='h1'>Detailed Career Quiz</h1>
            <p>You can change your answers at any time.</p>
            <p>Please answer on a scale of 1 to 5 (1 Being Worst, 5 Being Best).</p>
            <div>
                <p>Completion: {completion}%</p>
                <progress value={completion} max="100"></progress>
                {completion === 100 && <p>Congratulations! You've completed all the questions.</p>}
            </div>
            {detailedQuestions.map((q, index) => (
                <div className="form-group" key={index}>
                    <p>{q.question}</p>
                    <div className="button-group">
                    {["1", "2", "3", "4", "5"].map((number) => (
                        <button className='button' onClick={() => handleResponse(index, number)}>{number}</button>
                    ))}</div>
                    {detailedQuestions[index].answered && <p>Your answer: {detailedQuestions[index].match}</p>}
                </div>
            ))}
            <div className="progress-container">
                <p>Completion: {completion}%</p>
                <progress value={completion} max="100"></progress>
                {completion === 100 && <p>Congratulations! You've completed all the questions.</p>}
            </div>
            <Button disabled={completion !== 100.00} onClick={() => {onSubmit(); navigate("/results")}}>Submit</Button>
        </div>
    );
};

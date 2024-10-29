import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Props = {detailedQuestionsData: {question: string, answered: boolean, match: number}[], onSubmit: () => {}}

export default function DetailedQuestions({detailedQuestionsData, onSubmit}: Props){

    const navigate = useNavigate();

    // Type: responses is an array of strings or nulls
    const [completion, setCompletion] = useState<number>(0);

    const handleResponse = (index: number, response: string): void => {

        // update detailedQuestionData json
        detailedQuestionsData[index] = {question: detailedQuestionsData[index].question, answered: true, match: Number(response)}

        const dqRef = detailedQuestionsData
        let answeredQuestions = dqRef.filter((item) => item.answered).length

        setCompletion(Number(((answeredQuestions / detailedQuestionsData.length) * 100).toFixed(2)));
    };

    return (
        <div>
            <h1 id="header">Detailed Career Quiz</h1>
            <p>You can change your answers at any time.</p>
            <p>Please answer on a scale of 1 to 5.</p>
            {detailedQuestionsData.map((q, index) => (
                <div key={index}>
                    <p>{q.question}</p>
                    <button onClick={() => handleResponse(index, "1")}>1</button>
                    <button onClick={() => handleResponse(index, "2")}>2</button>
                    <button onClick={() => handleResponse(index, "3")}>3</button>
                    <button onClick={() => handleResponse(index, "4")}>4</button>
                    <button onClick={() => handleResponse(index, "5")}>5</button>
                    {detailedQuestionsData[index].answered && <p>Your answer: {detailedQuestionsData[index].match}</p>}
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

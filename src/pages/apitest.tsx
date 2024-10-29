import React, { useState } from 'react';
import './apitest.css';

const ApiTest = ({ generateResponse }: { generateResponse: (input: { basicData: any; detailedData: any; }) => Promise<{ content: string }> }) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await generateResponse({ basicData: input, detailedData: input });
        setResponse(result.content);
    };

    return (
        <div className="container">
            <h1>API Test</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="input">Input:</label>
                    <input
                        type="text"
                        id="input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div className="form-group">
                    <label>Response:</label>
                    <textarea readOnly value={response} />
                </div>
            )}
        </div>
    );
};

export default ApiTest;
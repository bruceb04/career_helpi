import React, { useState } from 'react';
import './apitest.css';

type GenerateResponseInput = {
    basicData: string;
    detailedData: string;
};

type GenerateResponseOutput = {
    content: string;
};

type ApiTestProps = {
    generateResponse: (input: GenerateResponseInput) => Promise<GenerateResponseOutput>;
};

const ApiTest = ({ generateResponse }: ApiTestProps) => {
    const [input, setInput] = useState<string>('');
    const [response, setResponse] = useState<string>('');

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
